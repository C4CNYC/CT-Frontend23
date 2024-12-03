import { useState, useCallback, useEffect, useMemo, useRef } from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useAuthContext } from '@root/src/auth/useAuthContext'
import { LessonType } from '@root/src/redux/interfaces/content.interface'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { useGetLessonStudentQuery } from '@root/src/redux/services/manager/lesson-student'
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
  preloadedCode: string
  isFileLoading: boolean
  barFiles: StudentFile[]
  activeFile: StudentFile
  isFileControllerAvailable: boolean

  onCloseFile: (id: string) => void
  onDeleteFile: (id: string) => void
  setActiveFile: (id: string) => void
  setIsOpen: (isOpen: boolean) => void
  onAddFile: (fileName: string) => Promise<void>
  onUpdateFile: (id: string, body: Partial<Omit<StudentFile, 'lessonId' | 'id'>>) => Promise<void>
}

const getLocalStorageRoomKey = (roomId: string | undefined): string => `room_doc_${roomId}`

export const DEFAULT_FILE_ID = 'default'
const DEFAULT_FILE = {
  id: DEFAULT_FILE_ID,
  name: 'index',
  extension: 'html',
  body: '',
}

export const useFileManager = (): UseFileManagerReturn => {
  const lessonRef = useRef<string | null>(null)

  const { query } = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAuthContext()

  const [isOpen, setIsOpen] = useState(false)
  const [barFiles, _setBarFiles] = useState<StudentFile[]>([])
  const [activeFile, _setActiveFile] = useState<StudentFile>()

  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId) || String(query?.lessonId)

  const [createStudentFile] = useCreateStudentFileMutation()
  const [deleteStudentFile] = useDeleteStudentFileMutation()
  const [updateStudentFile] = useUpdateStudentFileMutation()

  const {
    refetch,
    isLoading,
    isFetching,
    data: files = [],
  } = useGetStudentFilesQuery(
    { lessonId: lessonId!, lessonContentId: slideId || '' },
    { skip: !lessonId || !slideId || !isAuthenticated }
  )

  const { data: lesson } = useGetLessonStudentQuery(
    { id: lessonId! },
    { skip: !lessonId || !isAuthenticated }
  )

  const localstorageCode = useMemo(() => {
    if (!lessonId && !query?.lessonId && !searchParams.get('sandbox') && isAuthenticated) {
      return
    }

    const localStorageKey = getLocalStorageRoomKey(
      `${query?.lessonId}${activeFile?.id}${slideIndex}`
    )

    return getLocalStorageCode(localStorageKey)
  }, [query?.lessonId, lessonId, activeFile, slideIndex, searchParams, isAuthenticated])

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
        _setBarFiles((prev) => prev.filter((file) => file.id !== id))
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
        _setBarFiles((prev) => [...prev, file])
      }
    },
    [files, barFiles, activeFile]
  )

  const onCloseFile = useCallback(
    (id: string) => {
      if (activeFile?.id === id) _setActiveFile(barFiles.filter((file) => file.id !== id)[0])
      _setBarFiles((prev) => prev.filter((file) => file.id !== id))
    },
    [barFiles, activeFile]
  )

  useEffect(() => {
    if (activeFile?.id === DEFAULT_FILE_ID) return
    if (activeFile) refetch()
  }, [activeFile])

  useEffect(() => {
    const isSandboxWithoutLesson = searchParams.get('sandbox') && !lesson?.id

    if (!isAuthenticated || isSandboxWithoutLesson) {
      _setActiveFile({ ...DEFAULT_FILE, body: localstorageCode ?? '' })
      _setBarFiles([{ ...DEFAULT_FILE, body: localstorageCode ?? '' }])
    }
  }, [isAuthenticated, searchParams, localstorageCode])

  useEffect(() => {
    if (!lesson?.id) return

    if (
      lessonRef.current === lesson?.id &&
      (activeFile?.id === DEFAULT_FILE_ID || lesson?.type === LessonType.PRACTICAL)
    ) {
      lessonRef.current = lesson?.id
      return
    }

    _setActiveFile(undefined)
    _setBarFiles([])
  }, [lessonId, slideId])

  useEffect(() => {
    if (isLoading || isFetching || !isAuthenticated) return

    if (files?.[0] && !files.find((file) => file.id === activeFile?.id)) {
      _setActiveFile(files[0])

      if (!barFiles.find((file) => file.id === files[0].id)) {
        _setBarFiles((prev) => [...prev, files[0]])
      }
    }
  }, [files])

  return {
    files,
    isOpen,
    barFiles,
    activeFile: activeFile!,
    preloadedCode: activeFile?.body!,
    isFileLoading: isFetching || isLoading,
    isFileControllerAvailable: !!activeFile && activeFile?.id !== DEFAULT_FILE_ID,

    setIsOpen,
    onAddFile,
    onCloseFile,
    onDeleteFile,
    onUpdateFile,
    setActiveFile,
  }
}

function getLocalStorageCode(key: string) {
  const localStorageCodeValue = localStorage.getItem(key)
  if (localStorageCodeValue) {
    try {
      const docInfo = JSON.parse(localStorageCodeValue) as Record<string, string>
      const code = (docInfo?.htmlBody as unknown as string[])?.join('')
      if (code) {
        return code
      }
    } catch (e) {
      return localStorageCodeValue
    }
  }
}
