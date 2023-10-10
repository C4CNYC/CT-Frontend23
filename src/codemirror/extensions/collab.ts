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
  roomId: string,
  version: number,
  fullUpdates: readonly Update[],
  timeout = 3000
): Promise<{ status: boolean, updates: Update[] }> {
  // Strip off transaction data
  const updates = fullUpdates.map((u) => ({
    clientID: u.clientID,
    changes: u.changes.toJSON(),
    effects: u.effects,
  }));

  return await new Promise(function (resolve, reject) {
    socket.timeout(timeout).emit("pushUpdates", roomId, version, JSON.stringify(updates), (err: unknown, status: boolean | unknown, updates: Update[]) => {
      if (err) { reject(err); return; }
      if (typeof status !== "boolean") { reject(new Error("No permission to access this document")); return; }
      resolve({ status, updates });
    });
  });
}

async function pullUpdates(
  socket: Socket,
  roomId: string,
  version: number,
  timeout = 3000
): Promise<readonly Update[]> {
  return await new Promise(function (resolve, reject) {
    socket.timeout(timeout).emit("pullUpdates", roomId, version, (err: unknown, updates: string) => {
      if (err) { reject(err); return; }
      try {
        resolve(JSON.parse(updates));
      } catch (e) {
        reject(new Error("No permission to access this document"));
      }
    });
  }).then((updates: any) =>
    updates.map((u: any) => {
      if (u.effects?.[0]) {
        const effects: Array<StateEffect<any>> = [];

        u.effects.forEach((effect: StateEffect<any>) => {
          if (effect.value?.id && effect.value?.from !== undefined) {
            const cursor = {
              id: effect.value.id,
              from: effect.value.from,
              to: effect.value.to,
            };

            effects.push(addCursor.of(cursor));
          } else if (effect.value?.id) {
            // We don't want to remove the cursor on disconnect
            // const cursorId = effect.value.id;
            // effects.push(removeCursor.of(cursorId));
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
  socket: Socket,
  roomId: string,
  timeout = 3000
): Promise<{ version: number; doc: Text }> {
  return await new Promise(function (resolve, reject) {
    socket.timeout(timeout).emit("getDocument", roomId, (error: unknown, version: number | unknown, doc: string) => {
      if (error) {
        reject(error); return;
      }
      if (typeof version !== "number") {
        reject(new Error("No permission to access this document")); return;
      }
      resolve({
        version,
        doc: Text.of(doc?.length ? doc.split("\n") : [""]),
      });
    });
  });
}

export const peerExtension = (
  socket: Socket,
  startVersion: number,
  id: string,
  roomId: string,
): Extension[] => {
  const collabPlugin = collab({
    startVersion,
    clientID: id,
    sharedEffects: (tr) => {
      console.log(tr.effects)
      const effects = tr.effects.filter((e) => {
        return e.is(addCursor) || e.is(removeCursor);
      });
      console.log(effects)

      return effects;
    },
  });

  const plugin = ViewPlugin.fromClass(
    class {
      private pushing = false;
      private done = false;

      constructor(private readonly view: EditorView) {
        void this.pull();

        socket.on("connect", this.onConnect.bind(this));
        socket.on("codeUpdated", this.onCodeUpdated.bind(this));
      }

      async onConnect() {
        await this.pull();
        await this.push();
      }

      async onCodeUpdated(socketId: string, _version: number, _doc: string) {
        if (socketId !== socket.id) {
          await this.pull();
        }
      }

      update(update: ViewUpdate): void {
        if (update.docChanged || update.transactions.length) void this.push();
      }

      async push(): Promise<void> {
        const updates = sendableUpdates(this.view.state);
        if (this.pushing || !updates.length) return;
        this.pushing = true;
        const version = getSyncedVersion(this.view.state);
        try {
          const { updates: pushedUpdates } = await pushUpdates(socket, roomId, version, updates);

          this.view.dispatch(receiveUpdates(this.view.state, pushedUpdates));

          this.pushing = false;
          // Check if we can send any updates after successful pull
          if (sendableUpdates(this.view.state).length) {
            await this.push();
          }
        } catch (e) {
          // The push failed - we don't try again. It will automatically push again when the connection is restored
          this.pushing = false;
        }
      }

      async pull(): Promise<void> {
        // We don't pull repeatedly - this is handled by the codeUpdated listener
        const version = getSyncedVersion(this.view.state);
        try {
          const updates = await pullUpdates(socket, roomId, version);
          this.view.dispatch(receiveUpdates(this.view.state, updates));

          // Check if we can send any updates after successful pull
          if (sendableUpdates(this.view.state).length) {
            await this.push();
          }
        } catch (e) {
          // The pull failed - we don't try again. It will automatically pull again when the connection is restored
        }
      }

      destroy(): void {
        this.done = true;
        socket.off("connect", this.onConnect);
        socket.off("codeUpdated", this.onCodeUpdated);
      }
    }
  );

  return [
    collabPlugin,
    plugin,
  ];
};
