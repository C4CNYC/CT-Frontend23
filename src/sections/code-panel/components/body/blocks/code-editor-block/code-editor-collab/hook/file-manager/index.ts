import { useState, useCallback, useEffect, useMemo, useRef } from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useAuthContext } from '@root/src/auth/useAuthContext'
import { ILesson, LessonType } from '@root/src/redux/interfaces/content.interface'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { useGetLessonStudentQuery } from '@root/src/redux/services/manager/lesson-student'
import {
  useCreateStudentFileMutation,
  useDeleteStudentFileMutation,
  useGetFilesByUnauthUserQuery,
  useGetStudentFilesQuery,
  useUpdateStudentFileMutation,
} from '@root/src/redux/services/manager/workspace-student'
import { useSelector } from '@root/src/redux/store'
import { BaseResponseInterface } from '@root/src/utils'

import { unauthFileLocalStorageManger } from './filesLocalstorageManager'
import { tabsLocalStorageManger } from './tabsLocalstorageManager'

interface UseFileManagerReturn {
  isOpen: boolean
  files: StudentFile[]
  preloadedCode: string
  isFileLoading: boolean
  localStorageKey: string
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

export const DEFAULT_FILE_ID = 'default'
const DEFAULT_FILE = {
  id: DEFAULT_FILE_ID,
  name: 'index',
  extension: 'html',
  body: '',
}

export const useFileManager = (): UseFileManagerReturn => {
  const lessonRef = useRef<(ILesson & BaseResponseInterface) | null>(null)

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
    data: lesson,
    isLoading: isLessonLoading,
    isFetching: isLessonFetching,
  } = useGetLessonStudentQuery({ id: lessonId! }, { skip: !lessonId })

  const {
    refetch,
    isLoading,
    isFetching,
    data: files = [],
  } = useGetStudentFilesQuery(
    { lessonId: lessonId!, lessonContentId: slideId || '' },
    { skip: !lessonId || !slideId || !isAuthenticated }
  )

  const {
    data: unauthFiles = [],
    isLoading: IsUnauthFilesLoading,
    isFetching: isUnauthFilesFetching,
  } = useGetFilesByUnauthUserQuery(
    { lessonId: lessonId!, lessonContentId: slideId || '' },
    { skip: !lessonId || !slideId || isAuthenticated }
  )

  const { localStorageKey, tabsMangerLocalStorageKey } = useMemo(() => {
    let localStorageKey

    switch (lesson?.type) {
      case LessonType.EXERCISE:
        localStorageKey = getLocalStorageRoomKey(`${lessonId}_${slideId}`)
        break
      case LessonType.PRACTICAL:
      default:
        localStorageKey = getLocalStorageRoomKey(`${lessonId}`)
        break
    }

    return {
      localStorageKey,
      tabsMangerLocalStorageKey: `${localStorageKey}_tabs`,
    }
  }, [lessonId, slideId, lesson])

  const localstorageCode = useMemo(() => {
    if (!lessonId && !query?.lessonId && !searchParams.get('sandbox') && isAuthenticated) {
      return
    }

    return getLocalStorageCode(localStorageKey)
  }, [
    query?.lessonId,
    lessonId,
    activeFile,
    slideIndex,
    searchParams,
    isAuthenticated,
    localStorageKey,
  ])

  const unauthFilesList = useMemo(() => {
    if (
      isAuthenticated ||
      isUnauthFilesFetching ||
      IsUnauthFilesLoading ||
      isLessonLoading ||
      isLessonFetching ||
      !slideId
    ) {
      return []
    }

    if (lessonRef.current?.id && lesson?.id && lesson?.id !== lessonRef.current?.id) {
      if (
        lesson?.type !== LessonType.EXERCISE &&
        lessonRef.current?.type !== LessonType.EXERCISE &&
        !lesson?.independent
      ) {
        const files = unauthFileLocalStorageManger(localStorageKey).carryOverFiles(
          getLocalStorageRoomKey(`${lessonRef.current?.id}`),
          unauthFiles
        )
        lessonRef.current = lesson!
        return files
      }
    }

    lessonRef.current = lesson!

    const files = unauthFileLocalStorageManger(localStorageKey).getFiles(unauthFiles)

    if (!files.length) {
      unauthFileLocalStorageManger(localStorageKey).addFile({
        id: DEFAULT_FILE_ID,
        name: 'hello',
        extension: 'html',
        body: '',
        lessonContentId: slideId,
      })
    }

    return unauthFileLocalStorageManger(localStorageKey).getFiles(unauthFiles)
  }, [
    unauthFiles,
    localStorageKey,
    isAuthenticated,
    activeFile,
    isLessonFetching,
    isUnauthFilesFetching,
    IsUnauthFilesLoading,
    lesson,
    slideId,
  ])

  const onAddFile = useCallback(
    async (fileName: string): Promise<void> => {
      if (!lessonId || !slideId) return

      const [name, extension] = fileName.split('.')

      try {
        if (!isAuthenticated) {
          const file = unauthFileLocalStorageManger(localStorageKey).addFile({
            id: `${name}-${extension}-${new Date().getTime()}`,
            name,
            extension,
            body: '',
            lessonContentId: slideId,
          })
          _setActiveFile(file)
          _setBarFiles((prev) => [...prev, file!])
          tabsLocalStorageManger(tabsMangerLocalStorageKey).addTab(file!.id)
          return
        }

        await createStudentFile({ name, extension, lessonId, body: '', lessonContentId: slideId })
      } catch (e: any) {
        throw new Error(e.message)
      }
    },
    [lessonId, slideId]
  )

  const onUpdateFile = useCallback(
    async (id: string, body: Partial<Omit<StudentFile, 'lessonId' | 'id'>>): Promise<void> => {
      const filteredBody = Object.fromEntries(
        Object.entries(body).filter(([_, value]) => value !== undefined)
      )

      try {
        if (!isAuthenticated) {
          unauthFileLocalStorageManger(localStorageKey).updateFile(id, filteredBody)
          return
        }

        await updateStudentFile({ id, ...filteredBody })
      } catch (e: any) {
        throw new Error(e.message)
      }
    },
    [isAuthenticated, localStorageKey]
  )

  const onDeleteFile = useCallback(
    (id: string) => {
      try {
        if (!isAuthenticated) {
          unauthFileLocalStorageManger(localStorageKey).removeFile(id)
        } else {
          deleteStudentFile({ id }).unwrap()
        }

        if (activeFile?.id === id) _setActiveFile(barFiles[0] || files[0])
        _setBarFiles((prev) => prev.filter((file) => file.id !== id))
        tabsLocalStorageManger(tabsMangerLocalStorageKey).removeTab(id)
      } catch (e: any) {
        throw new Error(e.message)
      }
    },
    [deleteStudentFile, activeFile, barFiles, files, isAuthenticated, localStorageKey]
  )

  const setActiveFile = useCallback(
    (id: string): void => {
      if (activeFile?.id === id) return

      let file: StudentFile | undefined

      if (!isAuthenticated) {
        file = unauthFilesList.find((file) => file.id === id)
      } else {
        file = files.find((file) => file.id === id)
      }

      if (!file) return

      _setActiveFile(file)
      if (!barFiles.find((file) => file.id === id)) {
        _setBarFiles((prev) => [...prev, file!])
        tabsLocalStorageManger(tabsMangerLocalStorageKey).addTab(file.id)
      }
    },
    [files, barFiles, activeFile, isAuthenticated, localStorageKey, unauthFilesList]
  )

  const onCloseFile = useCallback(
    (id: string) => {
      if (activeFile?.id === id) _setActiveFile(barFiles.filter((file) => file.id !== id)[0])
      _setBarFiles((prev) => prev.filter((file) => file.id !== id))
      tabsLocalStorageManger(tabsMangerLocalStorageKey).removeTab(id)
    },
    [barFiles, activeFile]
  )

  useEffect(() => {
    if (!isAuthenticated || searchParams.get('sandbox')) return
    if (activeFile) refetch()
  }, [activeFile, searchParams])

  useEffect(() => {
    if (searchParams.get('sandbox')) {
      _setActiveFile({ ...DEFAULT_FILE, body: localstorageCode ?? '' })
      _setBarFiles([{ ...DEFAULT_FILE, body: localstorageCode ?? '' }])
    }
  }, [isAuthenticated, searchParams, localstorageCode])

  useEffect(() => {
    if (searchParams.get('sandbox')) {
      return
    }

    if (
      !lessonRef.current ||
      (lessonRef.current?.id === lesson?.id &&
        (activeFile?.id === DEFAULT_FILE_ID || lesson?.type === LessonType.PRACTICAL))
    ) {
      lessonRef.current = lesson!
      return
    }

    _setActiveFile(undefined)
    _setBarFiles([])
  }, [lesson, slideId, searchParams])

  useEffect(() => {
    _setActiveFile(undefined)
    _setBarFiles([])
  }, [lessonId])

  /* authorized user entry point */
  useEffect(() => {
    if (isLoading || isFetching || !isAuthenticated) return

    if (files?.[0] && !files.find((file) => file.id === activeFile?.id)) {
      const lastVisitedTabs = tabsLocalStorageManger(tabsMangerLocalStorageKey).getTabs()

      if (lastVisitedTabs.length) {
        const lastVisitedFiles = files.filter((file) => lastVisitedTabs.includes(file.id))

        if (lastVisitedFiles.length) {
          _setActiveFile(lastVisitedFiles[0])
          _setBarFiles((prev) => [...lastVisitedFiles])

          return
        }
      }

      _setActiveFile(files[0])

      if (!barFiles.find((file) => file.id === files[0].id)) {
        _setBarFiles((prev) => [...prev, files[0]])
        tabsLocalStorageManger(tabsMangerLocalStorageKey).addTab(files[0].id)
      }
    }
  }, [files])

  /* not authorized user entry point */
  useEffect(() => {
    if (IsUnauthFilesLoading || isUnauthFilesFetching || isAuthenticated) return

    if (unauthFilesList?.[0] && !unauthFilesList.find((file) => file.id === activeFile?.id)) {
      const lastVisitedTabs = tabsLocalStorageManger(tabsMangerLocalStorageKey).getTabs()

      if (lastVisitedTabs.length) {
        const lastVisitedFiles = unauthFilesList.filter((file) => lastVisitedTabs.includes(file.id))

        if (lastVisitedFiles.length) {
          _setActiveFile(lastVisitedFiles[0])
          _setBarFiles((prev) => [...lastVisitedFiles])

          return
        }
      }

      switch (lesson?.type) {
        case LessonType.EXERCISE:
          _setActiveFile(unauthFilesList[0])
          break
        case LessonType.PRACTICAL:
        default:
          if (!activeFile) _setActiveFile(unauthFilesList[0])
          break
      }

      _setBarFiles((prev) => {
        const prevFiltered = prev.filter((file) => unauthFilesList.find((f) => f.id === file.id))
        if (!prev.find((file) => file.id === unauthFilesList[0].id)) {
          return [...prevFiltered, unauthFilesList[0]]
        }

        return prevFiltered
      })
      tabsLocalStorageManger(tabsMangerLocalStorageKey).addTab(unauthFilesList[0].id)
    }
  }, [
    lesson,
    activeFile,
    unauthFilesList,
    isAuthenticated,
    IsUnauthFilesLoading,
    isUnauthFilesFetching,
  ])

  return {
    files: isAuthenticated ? files : unauthFilesList,
    isOpen,
    barFiles,
    localStorageKey,
    activeFile: activeFile!,
    preloadedCode: activeFile?.body!,
    isFileLoading: isFetching || isLoading || IsUnauthFilesLoading || isUnauthFilesFetching,
    isFileControllerAvailable: !!activeFile || !!unauthFilesList.length,

    setIsOpen,
    onAddFile,
    onCloseFile,
    onDeleteFile,
    onUpdateFile,
    setActiveFile,
  }
}

const getLocalStorageRoomKey = (roomId: string | undefined): string => `room_doc_${roomId}`

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
