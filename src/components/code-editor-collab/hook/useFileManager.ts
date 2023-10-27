import { useState } from "react";
import { Socket } from "socket.io-client";

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
}

const DEFAULT_FILE = "index.html"

export const useFileManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFile, _setActiveFile] = useState(DEFAULT_FILE);
  const [fileList, setFileList] = useState<string[]>([DEFAULT_FILE]);
  const [addedFileList, setAddedFileList] = useState<string[]>([DEFAULT_FILE]);
  const [isFileFormOpen, setIsFileFormOpen] = useState(false);

  const onAddFile = (fileName: string): void => {
    setFileList([...fileList, fileName])
  }

  const onDeleteFile = (fileName: string): string | null => {
    if (fileList.length === 1) {
      return null;
    }

    const isActiveFileDeleted = fileName === activeFile;
    const newFileList = [...fileList];
    const index = newFileList.findIndex(_fileName => _fileName === fileName);

    const addedFileIndex = addedFileList.findIndex((f) => f === fileName);

    if (addedFileIndex > -1) {
      const newAddedFileList = [...addedFileList];
      newAddedFileList.splice(addedFileIndex, 1);
      setAddedFileList(newAddedFileList);
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

    return newActiveFile
  }

  const setActiveFile = (fileName: string): void => {
    if (!addedFileList.includes(fileName)) {
      setAddedFileList([fileName, ...addedFileList]);
    }

    _setActiveFile(fileName);
  }

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
    onDeleteFile
  }
}