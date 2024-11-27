import { useState, useCallback, useEffect } from 'react'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import {
  useCreateStudentFileMutation,
  useDeleteStudentFileMutation,
  useGetStudentFilesQuery,
} from '@root/src/redux/services/manager/workspace-student'
import { useSelector } from '@root/src/redux/store'

interface UseFileManagerReturn {
  isOpen: boolean
  files: StudentFile[]
  onAddFile: (fileName: string, lessonContentId: string) => Promise<void>
  activeFile: StudentFile
  setActiveFile: (id: string) => void
  setIsOpen: (isOpen: boolean) => void
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
  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
  const [isOpen, setIsOpen] = useState(false)
  const [activeFile, _setActiveFile] = useState<StudentFile>()

  const [createStudentFile] = useCreateStudentFileMutation()
  const [deleteStudentFile] = useDeleteStudentFileMutation()
  const { data: files = [] } = useGetStudentFilesQuery(
    { contentId: slideId, prevContentId: '' },
    { skip: !slideId }
  )

  // ------------------------------------------------------ //
  //                        Handlers                        //
  // ------------------------------------------------------ //

  const onAddFile = async (fileName: string, lessonContentId: string): Promise<void> => {
    const [name, extension] = fileName.split('.')
    try {
      await createStudentFile({ name, extension, lessonContentId, body: '' })
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  const onDeleteFile = useCallback((id: string) => {
    try {
      deleteStudentFile({ id }).unwrap()
      getDefaultFile()
    } catch (e: any) {
      throw new Error(e.message)
    }
  }, [])

  const setActiveFile = useCallback(
    (id: string): void => {
      _setActiveFile(files.find((file) => file.id === id))
    },
    [files]
  )

  const getDefaultFile = () => {
    _setActiveFile(
      files.find((file) => file.name === 'index' || file.name === 'main') || files[0] || null
    )
  }

  useEffect(() => {
    if (files && !activeFile) {
      getDefaultFile()
    }
  }, [files])

  // ------------------------------------------------------ //

  return {
    onAddFile,
    isOpen,
    files,
    activeFile: activeFile!,
    setActiveFile,
    setIsOpen,
    onDeleteFile,
  }
}
