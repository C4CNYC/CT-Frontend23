import { useCallback, useEffect, useRef, useState } from "react";

import { Socket } from "socket.io-client";

import { EditorMode } from "./constants";
import { type FileInfo } from "./utils/peer-extension";
import { EmitSocketEvents, SubscribedEvents } from "./utils/socket";

interface UseFileManagerReturn {
  isOpen: boolean;
  fileList: string[];
  addedFileList: string[];
  isFileFormOpen: boolean;
  onAddFile: (fileName: string) => void;
  activeFile: string;
  setActiveFile: (fileName: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsFileFormOpen: (isOpen: boolean) => void;
  onDeleteFile: (fileName: string) => string | null;
  onDeleteFileWithEvents: (fileName: string) => void;
  onResetFileManager: (info: FileInfo) => void;
  onChangeFileWithEvents: (fileName: string) => void;
}

const DEFAULT_FILE = "index.html";

interface UseFileManagerProps {
  socket: Socket;
  roomId: string;
  mode: EditorMode;
}

export const useFileManager = ({
  socket,
  roomId,
  mode,
}: UseFileManagerProps): UseFileManagerReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [localActiveFile, _setActiveFile] = useState(DEFAULT_FILE);
  const [fileList, setFileList] = useState<string[]>([DEFAULT_FILE]);
  const [addedFileList, setAddedFileList] = useState<string[]>([DEFAULT_FILE]);
  const [isFileFormOpen, setIsFileFormOpen] = useState(false);
  const deleteFileRef = useRef<((fileName: string) => string | null) | null>(
    null
  );

  console.log(fileList, addedFileList);

  const onAddFile = (fileName: string): void => {
    socket.emit(SubscribedEvents.AddFile, socket.id, roomId, fileName);
    setFileList([...fileList, fileName]);
  };

  const onDeleteFile = useCallback(
    (fileName: string): string | null => {
      if (fileList.length === 1) {
        return null;
      }

      const isActiveFileDeleted = fileName === localActiveFile;
      const newFileList = [...fileList];
      const index = newFileList.findIndex(
        (_fileName) => _fileName === fileName
      );
      const addedFileIndex = addedFileList.findIndex((f) => f === fileName);

      if (addedFileIndex > -1) {
        const newAddedFileList = [...addedFileList];
        newAddedFileList.splice(addedFileIndex, 1);
        setAddedFileList(newAddedFileList);
        socket.emit(
          EmitSocketEvents.AddedFileListUpdated,
          roomId,
          newAddedFileList
        );
      }

      let newActiveFile: string | null = null;

      if (isActiveFileDeleted) {
        const nextActiveFile =
          newFileList[index - 1] != null
            ? newFileList[index - 1]
            : newFileList[index + 1];

        newActiveFile = nextActiveFile;
        _setActiveFile(nextActiveFile);
      }

      newFileList.splice(index, 1);
      setFileList(newFileList);

      return newActiveFile;
    },
    [fileList, addedFileList, localActiveFile, roomId, socket]
  );

  const onDeleteFileWithEvents = useCallback(
    (fileName: string) => {
      const newActiveFile = onDeleteFile(fileName);
      socket.emit(EmitSocketEvents.SetActiveFile, roomId, newActiveFile);
      socket.emit(EmitSocketEvents.DeleteFile, roomId, fileName);
    },
    [onDeleteFile, socket]
  );

  const onChangeFileWithEvents = async (fileName: string) => {
    setActiveFile(fileName);
    socket.emit(EmitSocketEvents.SetActiveFile, roomId, fileName);
  };

  const onResetFileManager = useCallback(
    ({ activeFile, files, filesInLayout }: FileInfo) => {
      _setActiveFile(activeFile);
      setFileList(files);
      setAddedFileList(filesInLayout);
    },
    []
  );

  const setActiveFile = useCallback(
    (fileName: string): void => {
      if (!addedFileList.includes(fileName)) {
        const newAddedFileList = [fileName, ...addedFileList];

        setAddedFileList(newAddedFileList);

        if (mode === EditorMode.Owner) {
          socket.emit(
            EmitSocketEvents.AddedFileListUpdated,
            roomId,
            newAddedFileList,
            socket.id
          );
        }
      }

      _setActiveFile(fileName);
    },
    [addedFileList, socket, mode, roomId]
  );

  useEffect(() => {
    deleteFileRef.current = onDeleteFile;
  }, [onDeleteFile]);

  useEffect(() => {
    socket.on(
      EmitSocketEvents.AddFileResponse + roomId,
      (fileName, socketId) => {
        if (socket.id !== socketId) {
          setFileList((prev) =>
            prev.includes(fileName) ? prev : [...prev, fileName]
          );
        }
      }
    );

    return () => {
      socket.off(EmitSocketEvents.AddFileResponse + roomId);
    };
  }, [roomId, socket]);

  useEffect(() => {
    if (mode === EditorMode.SubOwner) {
      socket.on(
        SubscribedEvents.DeleteResponse,
        (_roomId: string, fileName: string) => {
          if (_roomId === roomId) {
            deleteFileRef.current?.(fileName);
          }
        }
      );
    }

    if (mode === EditorMode.Watcher) {
      socket.on(
        SubscribedEvents.ActiveFileChanged,
        (_roomId: string, fileName: string) => {
          if (_roomId === roomId) {
            setActiveFile(fileName);
          }
        }
      );
    }

    return () => {
      if (mode === EditorMode.SubOwner) {
        socket.off(SubscribedEvents.DeleteResponse);
      }

      if (mode === EditorMode.Watcher) {
        socket.off(SubscribedEvents.ActiveFileChanged);
      }
    };
  }, [mode, socket, roomId]);

  return {
    onAddFile,
    isOpen,
    isFileFormOpen,
    fileList,
    activeFile: localActiveFile,
    setActiveFile,
    setIsOpen,
    setIsFileFormOpen,
    addedFileList,
    onDeleteFile,
    onResetFileManager,
    onDeleteFileWithEvents,
    onChangeFileWithEvents,
  };
};
