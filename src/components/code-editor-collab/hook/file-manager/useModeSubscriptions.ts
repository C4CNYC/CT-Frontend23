import { Socket } from "socket.io-client";
import { useMemo, useEffect, useRef } from "react";

import { EmitSocketEvents, SubscribedEvents } from "../utils/socket";
import { EditorMode } from "../constants";
import { File } from "../utils/collab/requests";

interface UseModeSubscriotionsProps {
  roomId: string
  onDeleteFile: (fileName: File) => void
  setActiveFile: (fileName: File) => void
  socket: Socket
  onUpdateFileList: (fileName: File, socketId: string) => void
  mode: EditorMode
}

export const useModeSubscriptions = ({
  roomId,
  onDeleteFile,
  onUpdateFileList,
  socket,
  setActiveFile,
  mode
}: UseModeSubscriotionsProps) => {
  const deleteFileRef = useRef(onDeleteFile);
  const setActiveFileRef = useRef(setActiveFile);

  useEffect(() => {
    setActiveFileRef.current = setActiveFile;
  }, [setActiveFile]);

  useEffect(() => {
    deleteFileRef.current = onDeleteFile;
  }, [onDeleteFile]);

  const modeSockets = useMemo(() => {
    const deleteEvent = `${SubscribedEvents.DeleteResponse}${roomId}`;
    const fileChangedEvent = `${SubscribedEvents.ActiveFileChanged}${roomId}`;
    const addFileEvent = `${SubscribedEvents.CreateFileResponse}${roomId}`;

    return {
      subscribe: {
        [EditorMode.SubOwner]: () => {
          socket.on(deleteEvent, (fileName: File) => {
            deleteFileRef.current(fileName);
          });
          socket.on(addFileEvent, onUpdateFileList);
        },
        [EditorMode.Watcher]: () => {
          socket.on(fileChangedEvent, (fileName: File) => {
            setActiveFileRef.current(fileName);
          });
          socket.on(addFileEvent, onUpdateFileList);
        },
        [EditorMode.Owner]: () => socket.on(addFileEvent, onUpdateFileList)
      },
      unsubscribe: {
        [EditorMode.SubOwner]: () => {
          socket.off(addFileEvent);
          socket.off(deleteEvent);
        },
        [EditorMode.Watcher]: () => {
          socket.off(fileChangedEvent);
          socket.off(addFileEvent);
        },
        [EditorMode.Owner]: () => socket.off(addFileEvent)
      }
    }
  }, [roomId, socket, onUpdateFileList]);

  useEffect(() => {
    modeSockets.subscribe[mode]();

    return () => {
      modeSockets.unsubscribe[mode]();
    }
  }, [mode, modeSockets]);
}
