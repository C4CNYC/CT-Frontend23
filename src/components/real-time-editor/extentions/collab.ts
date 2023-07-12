import {
  Update,
  collab,
  getSyncedVersion,
  receiveUpdates,
  sendableUpdates,
} from "@codemirror/collab";
import { ChangeSet, Extension, StateEffect, Text } from "@codemirror/state";
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { Socket } from "socket.io-client";

import { addCursor, removeCursor } from "./cursors";

async function pushUpdates(
  socket: Socket,
  version: number,
  fullUpdates: readonly Update[]
): Promise<boolean> {
  // Strip off transaction data
  const updates = fullUpdates.map((u) => ({
    clientID: u.clientID,
    changes: u.changes.toJSON(),
    effects: u.effects ?? [],
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
      if (u.effects?.[0]) {
        const effects: Array<StateEffect<any>> = [];

        u.effects.forEach((effect: StateEffect<any>) => {
          if (effect.value?.id && effect.value?.from) {
            const cursor = {
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
      // private pushing = false;
      private done = false;

      constructor(private readonly view: EditorView) {
        this.pull();
      }

      update(update: ViewUpdate): void {
        if (update.docChanged || update.transactions.length) this.push();
      }

      async push(): Promise<void> {
        const updates = sendableUpdates(this.view.state);
        if (!updates.length) return;
        // this.pushing = true;
        const version = getSyncedVersion(this.view.state);
        await pushUpdates(socket, version, updates);
        // this.pushing = false;
        // Regardless of whether the push failed or new updates came in
        // while it was running, try again if there's updates remaining
        if (sendableUpdates(this.view.state).length) {
          setTimeout(async () => {
            await this.push();
          }, 100);
        }

        // Regardless of whether the push failed or new updates came in
        // while it was running, try again if there's updates remaining
      }

      async pull(): Promise<void> {
        while (!this.done) {
          const version = getSyncedVersion(this.view.state);
          const updates = await pullUpdates(socket, version);
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
      clientID: id,
      sharedEffects: (tr) => {
        const effects = tr.effects.filter((e) => {
          return e.is(addCursor) || e.is(removeCursor);
        });

        return effects;
      },
    }),
    plugin,
  ];
};
