import {
  type Update,
  collab,
  getSyncedVersion,
  receiveUpdates,
  sendableUpdates,
} from "@codemirror/collab";
import { ChangeSet, StateEffect, Text } from "@codemirror/state";
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { Socket } from "socket.io-client";

import {
  AddComment,
  addComment,
  removeComment,
} from "../../../../codemirror/extensions/comments";
import {
  AddCursor,
  addCursor,
  removeCursor,
} from "../../../../codemirror/extensions/cursors";
import { EmitSocketEvents, SubscribedEvents } from "./socket";

const pushUpdates = async (
  socket: Socket,
  roomId: string,
  version: number,
  fullUpdates: readonly Update[],
  fileName: string,
  timeout = 3000
): Promise<{ status: boolean; updates: Update[] }> => {
  // Strip off transaction data
  const updates = fullUpdates.map((u) => ({
    clientID: u.clientID,
    changes: u.changes.toJSON(),
    effects: u.effects,
  }));

  return await new Promise(function (resolve, reject) {
    socket.timeout(timeout).emit(
      EmitSocketEvents.Push,
      {
        roomId,
        version,
        updates: JSON.stringify(updates),
        fileName: {
          id: fileName,
          name: fileName,
        },
      },
      (err: unknown, data: { status: boolean; updates: Update[] }) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      }
    );
  });
};

const pullUpdates = async (
  socket: Socket,
  roomId: string,
  version: number,
  fileName: string,
  timeout = 3000
): Promise<readonly Update[]> => {
  return await new Promise(function (resolve) {
    socket.emit(
      EmitSocketEvents.Pull,
      {
        roomId,
        version,
        fileName: {
          id: fileName,
          name: fileName,
        },
        socketId: socket.id,
      },
      (updates: string[]) => {
        resolve(updates);
      }
    );
  }).then((updates: any) =>
    updates?.map((x: any) => {
      const u = JSON.parse(x);
      if (u.effects[0]) {
        const effects: Array<StateEffect<any>> = [];

        u.effects.forEach((effect: StateEffect<any>) => {
          if (effect.value?.type === "add-cursor") {
            const cursor: AddCursor = {
              type: "add-cursor",
              id: effect.value.id,
              from: effect.value.from,
              to: effect.value.to,
            };

            effects.push(addCursor.of(cursor));
          } else if (effect.value?.type === "remove-cursor") {
            // We don't want to remove the cursor on disconnect
            // const cursorId = effect.value.id;
            // effects.push(removeCursor.of(cursorId));
          } else if (effect.value?.type === "add-comment") {
            const comment: AddComment = {
              type: "add-comment",
              id: effect.value.id,
              from: effect.value.from,
              to: effect.value.to,
              content: effect.value.content,
              createdBy: effect.value.createdBy,
            };

            effects.push(addComment.of(comment));
          } else if (effect.value?.type === "remove-comment") {
            effects.push(
              removeComment.of({
                type: "remove-comment",
                id: effect.value.id,
              })
            );
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
};

interface GetDocumentProps {
  socket: Socket;
  roomId: string;
  cursorName: string;
  fileName?: string;
  preloadedCode?: string;
}

interface GetDocumentReturn {
  version: number;
  doc: Text;
  cursorName: string;
  updates: any;
}

export interface FileInfo {
  activeFile: string;
  files: string[];
  filesInLayout: string[];
}

export const getFileInfo = async (
  roomId: string,
  socket: Socket
): Promise<FileInfo> => {
  return await new Promise((resolve) => {
    socket.emit(EmitSocketEvents.GetFileInfo, roomId);

    socket.once(SubscribedEvents.GetFileInfoResponse, (info: FileInfo) => {
      resolve(info);
    });
  });
};

export const isRoomExist = async (
  roomId: string,
  socket: Socket
): Promise<boolean> => {
  return await new Promise((resolve) => {
    socket.emit("isRoomExist", roomId);

    socket.once("isRoomExistResponse" + roomId, (isExist: boolean) => {
      resolve(isExist);
    });
  });
};

export const getDocument = async ({
  socket,
  roomId,
  cursorName,
  fileName,
  preloadedCode,
}: GetDocumentProps): Promise<GetDocumentReturn> => {
  return await new Promise(function (resolve) {
    socket.emit(EmitSocketEvents.GetDoc, {
      roomId,
      cursorName,
      fileName: {
        id: fileName,
        name: fileName,
      },
      defaultFileName: fileName,
      preloadedCode,
    });

    socket.once(
      SubscribedEvents.GetDocResponse,
      function ({
        version,
        doc,
        cursorName,
        updates,
      }: {
        version: number;
        doc: string;
        cursorName: string;
        updates: any;
      }) {
        resolve({
          version,
          doc: Text.of(doc.split("\n")),
          cursorName,
          updates,
        });
      }
    );
  });
};

interface PeerExtensionProps {
  socket: Socket;
  roomId: string;
  startVersion: number;
  fileName?: string;
}

export const peerExtension = ({
  socket,
  roomId,
  startVersion,
  fileName,
}: PeerExtensionProps) => {
  const plugin = ViewPlugin.fromClass(
    class {
      private pushing = false;
      private done = false;

      private readonly onConnectCallback: () => void;
      private readonly onCodeUpdatedCallback: ({
        socketId,
      }: {
        socketId: string;
      }) => void;

      constructor(private readonly view: EditorView) {
        void this.pull();

        this.onConnectCallback = this.onConnect.bind(this);
        this.onCodeUpdatedCallback = this.onCodeUpdated.bind(this);

        socket.on("connect", this.onConnectCallback);
        socket.on("codeUpdated", this.onCodeUpdatedCallback);
      }

      async onConnect() {
        await this.pull();
        await this.push();
      }

      async onCodeUpdated({ socketId }: { socketId: string }) {
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
          const { updates: pushedUpdates } = await pushUpdates(
            socket,
            roomId,
            version,
            updates,
            fileName ?? ""
          );
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
          const updates = await pullUpdates(
            socket,
            roomId,
            version,
            fileName ?? ""
          );
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
        socket.off("connect", this.onConnectCallback);
        socket.off("codeUpdated", this.onCodeUpdatedCallback);
      }
    }
  );

  return [
    collab({
      startVersion,
      sharedEffects: (tr) =>
        tr.effects.filter(
          (e) =>
            e.is(addCursor) ||
            e.is(removeCursor) ||
            e.is(addComment) ||
            e.is(removeComment)
        ),
    }),
    plugin,
  ];
};
