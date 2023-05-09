import {
  collab,
  getSyncedVersion,
  receiveUpdates,
  sendableUpdates,
  Update,
} from "@codemirror/collab";
import { ChangeSet, Extension, Text } from "@codemirror/state";
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { Socket } from "socket.io-client";

async function pushUpdates(
  socket: Socket,
  version: number,
  fullUpdates: readonly Update[]
): Promise<boolean> {
  // Strip off transaction data
  console.log("PUSH UDPATE");
  const updates = fullUpdates.map((u) => ({
    clientID: u.clientID,
    changes: u.changes.toJSON(),
    // effects: u.effects,
  }));

  return await new Promise(function (resolve) {
    socket.emit("pushUpdates", version, JSON.stringify(updates));

    socket.once("pushUpdateResponse", function (status: boolean) {
      resolve(status);
    });
  });
}

async function pullUpdates(
  socket: Socket,
  version: number
): Promise<readonly Update[]> {
  return await new Promise(function (resolve) {
    socket.emit("pullUpdates", version);

    socket.once("pullUpdateResponse", function (updates: any) {
      resolve(JSON.parse(updates));
    });
  }).then((updates: any) =>
    updates.map((u: any) => {
      return {
        changes: ChangeSet.fromJSON(u.changes),
        clientID: u.clientID,
      };
    })
  );
}

export async function getDocument(
  socket: Socket
): Promise<{ version: number; doc: Text }> {
  return await new Promise(function (resolve) {
    socket.emit("getDocument");

    socket.once("getDocumentResponse", function (version: number, doc: string) {
      if (version === undefined || !doc) return;
      resolve({
        version,
        doc: Text.of(doc.split("\n")),
      });
    });
  });
}

export const peerExtension = (
  socket: Socket,
  startVersion: number,
  id: string
): Extension[] => {
  const plugin = ViewPlugin.fromClass(
    class {
      private pushing = false;
      private done = false;

      constructor(private readonly view: EditorView) {
        this.pull();
      }

      update(update: ViewUpdate): void {
        if (update.docChanged) this.push();
      }

      async push(): Promise<void> {
        const updates = sendableUpdates(this.view.state);
        if (this.pushing || !updates.length) return;
        this.pushing = true;
        const version = getSyncedVersion(this.view.state);
        await pushUpdates(socket, version, updates);
        this.pushing = false;
        // Regardless of whether the push failed or new updates came in
        // while it was running, try again if there's updates remaining
        // if (sendableUpdates(this.view.state).length) {
        //   setTimeout(async () => {
        //     console.log("SENDABLE PUSH");
        //     await this.push();
        //   }, 1000);
        // }
      }

      async pull(): Promise<void> {
        while (!this.done) {
          const version = getSyncedVersion(this.view.state);
          const updates = await pullUpdates(socket, version);
          console.log("PULL UPDATE STATE");
          this.view.dispatch(receiveUpdates(this.view.state, updates));
        }
      }

      destroy(): void {
        this.done = true;
      }
    }
  );

  return [
    collab({
      startVersion,
      // clientID: id,
      // sharedEffects: (tr) => {
      //   const effects = tr.effects.filter((e) => {
      //     return e.is(addCursor) || e.is(removeCursor);
      //   });

      //   return effects;
      // },
    }),
    plugin,
  ];
};
