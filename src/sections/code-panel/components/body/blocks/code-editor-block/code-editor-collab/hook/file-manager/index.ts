import { useState, useCallback } from 'react'

import { DEFAULT_FILE } from '../constants'
import { type File } from '../requests'

interface UseFileManagerReturn {
  isOpen: boolean
  fileList: File[]
  addedFileList: File[]
  isFileFormOpen: boolean
  onAddFile: (fileName: string) => Promise<void>
  activeFile: File
  setActiveFile: (id: string) => void
  setIsOpen: (isOpen: boolean) => void
  setIsFileFormOpen: (isOpen: boolean) => void
  onDeleteFile: (id: string) => void
}

/*
  #TODO: ISSUE-272
    - Add file creation logic
    - Add file deletion logic
    - Update logic for setting active file
    - Add file list from api call
    - Add default file from api call (
        default file should be the file with name index or main,
        if not found then first file in the list
      )
    - after finishing the above points remove the all TODO comments
*/

export const useFileManager = (): UseFileManagerReturn => {
  const [isOpen, setIsOpen] = useState(false)

  // #TODO: ISSUE-272 - Default file should be from api call
  const [activeFile, _setActiveFile] = useState<File>(DEFAULT_FILE)

  // #TODO: ISSUE-272 - File list should be from api call
  // this state should be removed
  const [fileList, setFileList] = useState<File[]>([])
  const [addedFileList, setAddedFileList] = useState<File[]>([])
  const [isFileFormOpen, setIsFileFormOpen] = useState(false)

  // ------------------------------------------------------ //
  //                        Handlers                        //
  // ------------------------------------------------------ //

  const onAddFile = async (fileName: string): Promise<void> => {
    // #TODO: ISSUE-272 - Add file creation logic
  }

  const onDeleteFile = useCallback((id: string) => {
    // #TODO: ISSUE-272 - Add file deletion logic
  }, [])

  const setActiveFile = useCallback((id: string): void => {
    // #TODO: ISSUE-272 - Update logic for setting active file
  }, [])

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
  }
}
