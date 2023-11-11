import { Socket } from "socket.io-client";
import { type MutableRefObject, useMemo, useEffect, useRef } from "react";

import { EmitSocketEvents, SubscribedEvents } from "../utils/socket";
import { EditorMode } from "../constants";

interface UseModeSubscriotionsProps {
  roomId: string
  onDeleteFile: (fileName: string) => void
  setActiveFile: (fileName: string) => void
  socket: Socket
  onUpdateFileList: (fileName: string, socketId: string) => void
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
    const addFileEvent = `${EmitSocketEvents.AddFileResponse}${roomId}`;

    return {
      subscribe: {
        [EditorMode.SubOwner]: () => {
          socket.on(deleteEvent, (fileName: string) => {
            deleteFileRef.current(fileName)
          });
          socket.on(addFileEvent, onUpdateFileList);
        },
        [EditorMode.Watcher]: () => {
          socket.on(fileChangedEvent, (fileName: string) => {
            setActiveFileRef.current(fileName)
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
