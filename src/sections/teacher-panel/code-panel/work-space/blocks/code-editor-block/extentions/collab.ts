import {
  collab,
  getSyncedVersion,
  receiveUpdates,
  sendableUpdates,
  Update,
} from "@codemirror/collab";

import { ChangeSet, Extension, StateEffect, Text } from "@codemirror/state";
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { Socket } from "socket.io-client";
import { addCursor, cursor, removeCursor } from "./cursors";

async function pushUpdates(
  socket: Socket,
  version: number,
  fullUpdates: readonly Update[]
): Promise<boolean> {
  // Strip off transaction data
  const updates = fullUpdates.map((u) => ({
    clientID: u.clientID,
    changes: u.changes.toJSON(),
    effects: u.effects,
  }));

  console.log("PUSH DATA", { updates, version });

  return await new Promise(function (resolve) {
    socket.emit("pushUpdates", version, JSON.stringify(updates));

    socket.once("pushUpdateResponse", function (status: boolean) {
      console.log("PUSH DATA STATU:", status);
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
      console.log("PULL UPDATED RESPONCE", { updates, version });
      resolve(JSON.parse(updates));
    });
  }).then((updates: any) =>
    updates.map((u: any) => {
      if (u.effects[0]) {
        const effects: Array<StateEffect<any>> = [];

        u.effects.forEach((effect: StateEffect<any>) => {
          if (effect.value?.id && effect.value?.from) {
            const cursor: cursor = {
              id: effect.value.id,
              from: effect.value.from,
              to: effect.value.to,
            };

            effects.push(addCursor.of(cursor));
          } else if (effect.value?.id) {
            const cursorId = effect.value.id;

            effects.push(removeCursor.of(cursorId));
          }
        });

        return {
          changes: ChangeSet.fromJSON(u.changes),
          clientID: u.clientID,
          effects,
        };
      }

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
      private lastUpdates: number | null = null;
      private lastPush: string | null = null;

      constructor(private readonly view: EditorView) {
        this.pull();
      }

      update(update: ViewUpdate): void {
        console.log(
          "UPDATE FUNCTION:",
          update,
          getSyncedVersion(this.view.state)
        );
        if (update.docChanged || update.transactions.length) this.push();
      }

      async push(): Promise<void> {
        try {
          const updates = sendableUpdates(this.view.state);
          if (!updates.length) {
            return;
          }
          this.lastPush = JSON.stringify(updates);
          this.pushing = true;
          const version = getSyncedVersion(this.view.state);
          await pushUpdates(socket, version, updates);
          this.pushing = false;

          // if (sendableUpdates(this.view.state).length) {
          //   setTimeout(async () => {
          //     await this.push();
          //   }, 100);
          // }
        } catch (e) {
          console.log(e);
        }
      }

      async pull(): Promise<void> {
        while (!this.done) {
          const version = getSyncedVersion(this.view.state);
          if (this.lastUpdates === version) {
            return;
          }
          const udpates = await pullUpdates(socket, version);
          this.lastUpdates = version;
          this.view.dispatch(receiveUpdates(this.view.state, udpates));
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
      clientID: id,
      sharedEffects: (tr) => {
        console.log(tr.effects, "effects");
        const effects = tr.effects.filter((e) => {
          return e.is(addCursor) || e.is(removeCursor);
        });

        return effects;
      },
    }),
    plugin,
  ];
};
