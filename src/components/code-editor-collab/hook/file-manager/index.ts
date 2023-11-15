import { useState, useCallback } from "react";
import { Socket } from "socket.io-client";

import { type FileInfo, type File, createFile } from "../utils/collab/requests";
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
  fileList: File[]
  addedFileList: File[]
  isFileFormOpen: boolean
  onAddFile: (fileName: string) => Promise<void>
  activeFile: File
  setActiveFile: (fileName: File) => void
  setIsOpen: (isOpen: boolean) => void
  setIsFileFormOpen: (isOpen: boolean) => void
  onDeleteFile: (fileName: File) => File | null
  onDeleteFileWithEvents: (fileName: File) => void
  onResetFileManager: (info?: FileInfo) => void
  onChangeFileWithEvents: (fileName: File) => void
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
  const [activeFile, _setActiveFile] = useState<File>(DEFAULT_FILE);
  const [fileList, setFileList] = useState<File[]>([DEFAULT_FILE]);
  const [addedFileList, setAddedFileList] = useState<File[]>([DEFAULT_FILE]);
  const [isFileFormOpen, setIsFileFormOpen] = useState(false);

  // ------------------------------------------------------ //
  //                        Handlers                        //
  // ------------------------------------------------------ //

  const onAddFile = async (fileName: string): Promise<void> => {
    const file = await createFile({ roomId, fileName, socket });
    setFileList([...fileList, file]);
  }

  const onDeleteFile = useCallback((fileName: File): File | null => {
    if (fileList.length === MIN_FILE_LIST_LENGTH) {
      return null;
    }

    const isActiveFileDeleted = fileName.id === activeFile.id;
    const newFileList = [...fileList];
    const index = newFileList.findIndex(({ id }) => id === fileName.id);
    const addedFileIndex = addedFileList.findIndex(({ id }) => id === fileName.id);

    if (addedFileIndex > -1) {
      const newAddedFileList = [...addedFileList];
      newAddedFileList.splice(addedFileIndex, 1);
      setAddedFileList(newAddedFileList);
      socket.emit(EmitSocketEvents.AddedFileListUpdated, roomId, newAddedFileList);
    }

    let newActiveFile: File | null = null;

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

  const onDeleteFileWithEvents = useCallback((fileName: File) => {
    const newActiveFile = onDeleteFile(fileName);

    if (newActiveFile != null) {
      socket.emit(EmitSocketEvents.SetActiveFile, roomId, newActiveFile);
    }

    socket.emit(EmitSocketEvents.DeleteFile, roomId, fileName);
  }, [onDeleteFile, socket]);

  const onChangeFileWithEvents = (fileName: File): void => {
    setActiveFile(fileName);

    if (mode === EditorMode.Owner) {
      socket.emit(EmitSocketEvents.SetActiveFile, roomId, fileName);
    }
  }

  const setActiveFile = useCallback((fileName: File): void => {
    const isExist = addedFileList.some(({ id }) => fileName.id === id);

    if (!isExist) {
      const newAddedFileList = [fileName, ...addedFileList];

      setAddedFileList(newAddedFileList);

      socket.emit(EmitSocketEvents.AddedFileListUpdated, roomId, newAddedFileList);
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

  const onUpdateFileList = useCallback((fileName: File, socketId: string) => {
    if (socket.id !== socketId) {
      setFileList((prev) => {
        const isExist = prev.some(({ id }) => id === fileName.id);

        return isExist ? prev : [...prev, fileName]
      });
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