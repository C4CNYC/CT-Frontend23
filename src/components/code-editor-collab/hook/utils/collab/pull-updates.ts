import { type Update } from "@codemirror/collab";
import { ChangeSet, StateEffect, StateEffectType } from "@codemirror/state";
import { type Socket } from "socket.io-client";

import { EmitSocketEvents } from "../socket";
import { type Cursor } from "./cursors";
import { File } from "./requests";

interface PullUpdateProps {
  roomId: string;
  version: number;
  fileName: File;
  socket: Socket;
  addCursor: StateEffectType<Cursor>;
}

export const pullUpdates = ({
  socket,
  roomId,
  version,
  fileName,
  addCursor,
}: PullUpdateProps): Promise<Update[]> => {
  return new Promise<Update[]>(function (resolve) {
    socket.emit(EmitSocketEvents.Pull, {
      roomId,
      version,
      fileName,
      socketId: socket.id,
    });
	  console.log("pullUpdates", `${EmitSocketEvents.PullResponse}${roomId}${fileName.id}`);
    socket.once(
      `${EmitSocketEvents.PullResponse}${roomId}${fileName.id}`,
      function (updates: Update[]) {
        resolve(updates);
      }
    );
  }).then((updates: Update[]) =>
    updates?.map((u: Update) => {
      if (u.effects?.[0] != null) {
        const effects: StateEffect<Cursor>[] = [];

        u.effects.forEach((effect: StateEffect<Cursor>) => {
          if (effect.value?.id) {
            const cursor: Cursor = {
              id: effect.value.id,
              from: effect.value.from,
              to: effect.value.to,
              tooltipText: effect.value.tooltipText,
            };

            effects.push(addCursor.of(cursor));
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
