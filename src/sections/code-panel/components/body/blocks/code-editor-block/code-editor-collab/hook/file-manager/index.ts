import { useState, useCallback, useEffect } from 'react'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import {
  useCreateStudentFileMutation,
  useDeleteStudentFileMutation,
  useGetStudentFilesQuery,
  useUpdateStudentFileMutation,
} from '@root/src/redux/services/manager/workspace-student'
import { useSelector } from '@root/src/redux/store'

interface UseFileManagerReturn {
  isOpen: boolean
  files: StudentFile[]
  onAddFile: (fileName: string, lessonId: string) => Promise<void>
  activeFile: StudentFile
  setActiveFile: (id: string) => void
  setIsOpen: (isOpen: boolean) => void
  onDeleteFile: (id: string) => void
  onUpdateFile: (id: string, body: Partial<Omit<StudentFile, 'lessonId' | 'id'>>) => Promise<void>
}

export const useFileManager = (): UseFileManagerReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFile, _setActiveFile] = useState<StudentFile>()

  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)

  const [createStudentFile] = useCreateStudentFileMutation()
  const [deleteStudentFile] = useDeleteStudentFileMutation()
  const [updateStudentFile] = useUpdateStudentFileMutation()
  const { data: files = [], isLoading } = useGetStudentFilesQuery(
    { lessonId: lessonId!, lessonContentId: slideId || '' },
    { skip: !lessonId || !slideId }
  )

  // ------------------------------------------------------ //
  //                        Handlers                        //
  // ------------------------------------------------------ //

  const getDefaultFile = useCallback(() => {
    if (!files) return null
    _setActiveFile(
      files.find((file) => file.name === 'index' || file.name === 'main') || files[0] || null
    )
  }, [files])

  const onAddFile = async (fileName: string, lessonId: string): Promise<void> => {
    const [name, extension] = fileName.split('.')
    try {
      await createStudentFile({ name, extension, lessonId, body: '' })
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  const onUpdateFile = async (
    id: string,
    body: Partial<Omit<StudentFile, 'lessonId' | 'id'>>
  ): Promise<void> => {
    try {
      const filteredBody = Object.fromEntries(
        Object.entries(body).filter(([_, value]) => value !== undefined)
      )
      await updateStudentFile({ id, ...filteredBody })
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  const onDeleteFile = useCallback(
    (id: string) => {
      try {
        deleteStudentFile({ id }).unwrap()
        getDefaultFile()
      } catch (e: any) {
        throw new Error(e.message)
      }
    },
    [deleteStudentFile, getDefaultFile]
  )

  const setActiveFile = useCallback(
    (id: string): void => {
      _setActiveFile(files.find((file) => file.id === id))
    },
    [files]
  )

  useEffect(() => {
    if (files) _setActiveFile(files[0])
  }, [files, getDefaultFile])

  useEffect(() => {
    if (isLoading) return
    getDefaultFile()
  }, [lessonId, slideId, getDefaultFile])

  // ------------------------------------------------------ //

  return {
    onAddFile,
    isOpen,
    files,
    activeFile: activeFile!,
    setActiveFile,
    setIsOpen,
    onDeleteFile,
    onUpdateFile,
  }
}
