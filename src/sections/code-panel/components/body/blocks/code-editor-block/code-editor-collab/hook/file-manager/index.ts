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
  isFileLoading: boolean
  barFiles: StudentFile[]
  files: StudentFile[]
  onAddFile: (fileName: string) => Promise<void>
  activeFile: StudentFile
  onCloseFile: (id: string) => void
  setActiveFile: (id: string) => void
  setIsOpen: (isOpen: boolean) => void
  onDeleteFile: (id: string) => void
  onUpdateFile: (id: string, body: Partial<Omit<StudentFile, 'lessonId' | 'id'>>) => Promise<void>
}

export const useFileManager = (): UseFileManagerReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [barFiles, setBarFiles] = useState<StudentFile[]>([])
  const [activeFile, _setActiveFile] = useState<StudentFile>()

  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)

  const [createStudentFile] = useCreateStudentFileMutation()
  const [deleteStudentFile] = useDeleteStudentFileMutation()
  const [updateStudentFile] = useUpdateStudentFileMutation()

  const {
    data: files = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetStudentFilesQuery(
    { lessonId: lessonId!, lessonContentId: slideId || '' },
    { skip: !lessonId || !slideId }
  )

  const onAddFile = async (fileName: string): Promise<void> => {
    if (!lessonId || !slideId) return

    const [name, extension] = fileName.split('.')
    try {
      await createStudentFile({ name, extension, lessonId, body: '', lessonContentId: slideId })
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
        if (activeFile?.id === id) _setActiveFile(barFiles[0] || files[0])
        setBarFiles((prev) => prev.filter((file) => file.id !== id))
      } catch (e: any) {
        throw new Error(e.message)
      }
    },
    [deleteStudentFile, activeFile, barFiles, files]
  )

  const setActiveFile = useCallback(
    (id: string): void => {
      if (activeFile?.id === id) return

      const file = files.find((file) => file.id === id)

      if (!file) return

      _setActiveFile(file)
      if (!barFiles.find((file) => file.id === id)) {
        setBarFiles((prev) => [...prev, file])
      }
    },
    [files, barFiles, activeFile]
  )

  const onCloseFile = useCallback(
    (id: string) => {
      if (activeFile?.id === id) _setActiveFile(barFiles.filter((file) => file.id !== id)[0])
      setBarFiles((prev) => prev.filter((file) => file.id !== id))
    },
    [barFiles, activeFile]
  )

  useEffect(() => {
    if (activeFile) refetch()
  }, [activeFile])

  useEffect(() => {
    if (files?.[0] && !files.find((file) => file.id === activeFile?.id)) {
      _setActiveFile(files[0])
      setBarFiles((prev) => [...prev, files[0]])
    }
  }, [files, activeFile])

  useEffect(() => {
    setBarFiles([])
  }, [lessonId, slideId])

  return {
    barFiles,
    onCloseFile,
    isFileLoading: isFetching || isLoading,
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
