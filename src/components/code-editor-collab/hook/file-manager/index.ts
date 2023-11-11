import { useState, useCallback } from "react";
import { Socket } from "socket.io-client";

import { type FileInfo } from "../utils/collab/requests";
import { useModeSubscriptions } from "./useModeSubscriptions";
import { EmitSocketEvents, SubscribedEvents } from "../utils/socket";
import { EditorMode } from "../constants";
import {
  DEFAULT_FILE,
  MIN_FILE_LIST_LENGTH,
  getEmptyFileManagement
} from "../constants"

interface UseFileManagerReturn {
  isOpen: boolean
  fileList: string[]
  addedFileList: string[]
  isFileFormOpen: boolean
  onAddFile: (fileName: string) => void
  activeFile: string
  setActiveFile: (fileName: string) => void
  setIsOpen: (isOpen: boolean) => void
  setIsFileFormOpen: (isOpen: boolean) => void
  onDeleteFile: (fileName: string) => string | null
  onDeleteFileWithEvents: (fileName: string) => void
  onResetFileManager: (info?: FileInfo) => void
  onChangeFileWithEvents: (fileName: string) => void
}

interface UseFileManagerProps {
  socket: Socket
  roomId: string
  mode: EditorMode
}

export const useFileManager = ({
  socket,
  roomId,
  mode
}: UseFileManagerProps): UseFileManagerReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFile, _setActiveFile] = useState(DEFAULT_FILE);
  const [fileList, setFileList] = useState<string[]>([DEFAULT_FILE]);
  const [addedFileList, setAddedFileList] = useState<string[]>([DEFAULT_FILE]);
  const [isFileFormOpen, setIsFileFormOpen] = useState(false);

  // ------------------------------------------------------ //
  //                        Handlers                        //
  // ------------------------------------------------------ //

  const onAddFile = (fileName: string): void => {
    socket.emit(SubscribedEvents.AddFile, socket.id, roomId, fileName);
    setFileList([...fileList, fileName]);
  }

  const onDeleteFile = useCallback((fileName: string): string | null => {
    console.log(fileName)
    if (fileList.length === MIN_FILE_LIST_LENGTH) {
      return null;
    }

    const isActiveFileDeleted = fileName === activeFile;
    const newFileList = [...fileList];
    const index = newFileList.findIndex(f => f === fileName);
    const addedFileIndex = addedFileList.findIndex((f) => f === fileName);

    if (addedFileIndex > -1) {
      const newAddedFileList = [...addedFileList];
      newAddedFileList.splice(addedFileIndex, 1);
      setAddedFileList(newAddedFileList);
      socket.emit(EmitSocketEvents.AddedFileListUpdated, roomId, newAddedFileList);
    }

    let newActiveFile: string | null = null;

    if (isActiveFileDeleted) {
      const nextActiveFile = newFileList[index - 1] != null
        ? newFileList[index - 1]
        : newFileList[index + 1];

      newActiveFile = nextActiveFile
      _setActiveFile(nextActiveFile);
    }

    newFileList.splice(index, 1);
    setFileList(newFileList);

    return newActiveFile;
  }, [fileList, addedFileList, activeFile, roomId, socket]);

  const onDeleteFileWithEvents = useCallback((fileName: string) => {
    const newActiveFile = onDeleteFile(fileName);
    socket.emit(EmitSocketEvents.SetActiveFile, roomId, newActiveFile);
    socket.emit(EmitSocketEvents.DeleteFile, roomId, fileName);
  }, [onDeleteFile, socket]);

  const onChangeFileWithEvents = (fileName: string) => {
    setActiveFile(fileName);

    if (mode === EditorMode.Owner) {
      socket.emit(EmitSocketEvents.SetActiveFile, roomId, fileName);
    }
  }

  const setActiveFile = useCallback((fileName: string): void => {
    if (!addedFileList.includes(fileName)) {
      const newAddedFileList = [fileName, ...addedFileList];

      setAddedFileList(newAddedFileList);

      socket.emit(EmitSocketEvents.AddedFileListUpdated, roomId, newAddedFileList, socket.id);
    }

    _setActiveFile(fileName);
  }, [addedFileList, socket, mode, roomId]);

  const onResetFileManager = useCallback(({
    activeFile,
    files,
    filesInLayout
  }: FileInfo = getEmptyFileManagement()) => {
    _setActiveFile(activeFile);
    setFileList(files);
    setAddedFileList(filesInLayout);
  }, []);

  const onUpdateFileList = useCallback((fileName: string, socketId: string) => {
    if (socket.id !== socketId) {
      setFileList((prev) => prev.includes(fileName) ? prev : [...prev, fileName]);
    }
  }, [socket]);

  useModeSubscriptions({
    roomId,
    onDeleteFile,
    setActiveFile,
    onUpdateFileList,
    socket,
    mode,
  });

   // ------------------------------------------------------ //

  return {
    onAddFile,
    isOpen,
    isFileFormOpen,
    fileList,
    activeFile,
    setActiveFile,
    setIsOpen,
    setIsFileFormOpen,
    addedFileList,
    onDeleteFile,
    onResetFileManager,
    onDeleteFileWithEvents,
    onChangeFileWithEvents
  }
}