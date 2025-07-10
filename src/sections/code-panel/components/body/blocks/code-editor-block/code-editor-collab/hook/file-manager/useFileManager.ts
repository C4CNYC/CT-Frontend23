import { useState, useCallback, useEffect, useMemo, useRef } from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useAuthContext } from '@root/src/auth/useAuthContext'
import { ILesson } from '@root/src/redux/interfaces/content.interface'
import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import {
  useGetLessonContentStudentQuery,
  useGetLessonStudentWithoutContentsQuery,
} from '@root/src/redux/services/manager/lesson-student'
import { useCompleteLessonMutation } from '@root/src/redux/services/manager/progress-student'
import {
  useCreateStudentFileMutation,
  useDeleteStudentFileMutation,
  useGetFilesByUnauthUserQuery,
  useGetStudentFilesQuery,
  useUpdateStudentFileMutation,
} from '@root/src/redux/services/manager/workspace-student'
import { useSelector } from '@root/src/redux/store'
import { BaseResponseInterface } from '@root/src/utils'

import {
  getLocalStorageCode,
  getLocalStorageFile,
  getLocalStorageRoomKey,
  killLocalStorageFile,
} from '../utils/getLocalStorage'

import { unauthFileLocalStorageManger } from './filesLocalstorageManager'
import { tabsLocalStorageManger } from './tabsLocalstorageManager'

export const DEFAULT_FILE_ID = 'default'
const DEFAULT_FILE = {
  id: DEFAULT_FILE_ID,
  name: 'index',
  extension: 'html',
  body: '',
}

export const useFileManager = () => {
  const lessonRef = useRef<(ILesson & BaseResponseInterface) | null>(null)

  const { query } = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated: isAuthenticatedSystem, user } = useAuthContext()
  let isAuthenticated = !!user
  const [isOpen, setIsOpen] = useState(false)
  const [barFiles, _setBarFiles] = useState<StudentFile[]>([])
  const [activeFile, _setActiveFile] = useState<StudentFile>()

  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId) || String(query?.lessonId)

  const [createStudentFile] = useCreateStudentFileMutation()
  const [deleteStudentFile] = useDeleteStudentFileMutation()
  const [updateStudentFile] = useUpdateStudentFileMutation()
  const [completeLesson] = useCompleteLessonMutation()

  const {
    data: lesson,
    isLoading: isLessonLoading,
    isFetching: isLessonFetching,
  } = useGetLessonStudentWithoutContentsQuery({ id: lessonId! }, { skip: !lessonId })

  const { data: lessonContent } = useGetLessonContentStudentQuery(
    { id: query.lessonId as string },
    { skip: !query.lessonId }
  )
  const shouldRunAuthFiles = !!lessonId && !!slideId && isAuthenticated
  const {
    refetch,
    isLoading,
    isFetching,
    data: authFiles = [],
  } = useGetStudentFilesQuery(
    { lessonId: lessonId!, lessonContentId: slideId || '' },
    { skip: !shouldRunAuthFiles }
  )

  const {
    data: unauthFiles = [],
    isLoading: IsUnauthFilesLoading,
    isFetching: isUnauthFilesFetching,
  } = useGetFilesByUnauthUserQuery(
    { lessonId: lessonId!, lessonContentId: slideId || '' },
    { skip: !lessonId || !slideId || isAuthenticated }
  )

  const sandbox = searchParams.get('sandbox')
  const isPageReady = useMemo(
    () => !isLessonLoading && !IsUnauthFilesLoading && !isLoading && !isFetching,
    [isLessonLoading, IsUnauthFilesLoading, isLoading, isFetching]
  )

  const { localStorageKey, tabsMangerLocalStorageKey } = useMemo(() => {
    let localStorageKey

    switch (lesson?.type) {
      case LessonType.EXERCISE:
        localStorageKey = getLocalStorageRoomKey(`${lessonId}_${slideId}`)
        break
      case LessonType.START_PROJECT:
        localStorageKey = getLocalStorageRoomKey(`${lessonId}_${slideId}`)
        break
      case LessonType.QUIZ:
        localStorageKey = getLocalStorageRoomKey(`${lessonId}_${slideId}`)
        break
      case LessonType.OTHER:
        localStorageKey = getLocalStorageRoomKey(`${lessonId}_${slideId}`)
        break
      case LessonType.PRACTICAL:
      default:
        localStorageKey = getLocalStorageRoomKey(`${lessonId}`)
        break
    }
    if (sandbox) {
      localStorageKey += `_sandbox`
    }

    return {
      localStorageKey,
      tabsMangerLocalStorageKey: `${localStorageKey}_tabs`,
    }
  }, [lessonId, slideId, lesson, sandbox])

  const localstorageCode = useMemo(() => {
    if (!lessonId) return
    return getLocalStorageCode(localStorageKey)
  }, [lessonId, localStorageKey])

  const unauthFilesList = useMemo(() => {
    if (
      isUnauthFilesFetching ||
      IsUnauthFilesLoading ||
      isLessonLoading ||
      isLessonFetching ||
      !slideId
    ) {
      return []
    }

    const excludedTypes = [
      LessonType.EXERCISE,
      LessonType.START_PROJECT,
      LessonType.QUIZ,
      LessonType.OTHER,
    ];

    if (lessonRef.current?.id && lesson?.id && lesson?.id !== lessonRef.current?.id) {
      if (
        !excludedTypes.includes(lesson?.type) &&
        !excludedTypes.includes(lessonRef.current?.type) &&
        !lesson?.independent
      ) {
        let files = unauthFileLocalStorageManger(localStorageKey).carryOverFiles(
          getLocalStorageRoomKey(`${lessonRef.current?.id}`),
          unauthFiles,
          true
        )
        lessonRef.current = lesson!
        return files
      }
    }

    lessonRef.current = lesson!
    let existingFiles = unauthFileLocalStorageManger(localStorageKey).getLocalStorageFiles()
    let accountableExistingFiles = Object.values(existingFiles).filter(
      (file) => file.body.length > 10
    )
    if (accountableExistingFiles.length) return Object.values(accountableExistingFiles)

    const files = unauthFileLocalStorageManger(localStorageKey).getFiles(
      unauthFiles,
      'ignoreThisVersion'
    )
    if (!isAuthenticated)
      if (!files.length) {
        unauthFileLocalStorageManger(localStorageKey).addFile(
          {
            ...DEFAULT_FILE,
            lessonContentId: slideId,
          },
          'ignoreThisVersion'
        )
      }

    return unauthFileLocalStorageManger(localStorageKey).getFiles(unauthFiles, 'ignoreThisVersion')
  }, [
    isAuthenticated,
    unauthFiles,
    localStorageKey,
    activeFile,
    isLessonFetching,
    isUnauthFilesFetching,
    IsUnauthFilesLoading,
    lesson,
    slideId,
  ])
  // Move file operations to useEffect
  const files = useMemo(() => {
    if (!isAuthenticated) return unauthFilesList

    let authFilesWithoutHello = authFiles.filter(
      (file) => !file.name.toLowerCase().startsWith('hello_')
    )

    // Just compute the derived state here, no side effects
    let unauthFilesNotSaved = unauthFilesList.filter(
      (file) =>
        !authFilesWithoutHello.find(
          (authFile) => authFile.name === file.name && authFile.extension === file.extension
        )
    )

    return [...authFilesWithoutHello, ...unauthFilesNotSaved]
  }, [authFiles, unauthFilesList, isAuthenticated]) // Use full arrays as dependencies
  useEffect(() => {
    if (!isAuthenticated || authFiles.length < 2 || !isPageReady) return
    let searched = new Set(authFiles.map((f) => `${f.name}.${f.extension}`))
    if (searched.size < authFiles.length) {
      let toDelete = []
      for (let filename of searched) {
        let duplicates = authFiles.filter((f) => `${f.name}.${f.extension}` === filename)
        if (duplicates.length > 1) {
          duplicates.sort((a, b) => b.body.length - a.body.length)
          toDelete.push(...duplicates.slice(1).map((f) => f.id))
        }
      }
      if (toDelete.length) {
        toDelete.forEach((id) => deleteStudentFile({ id }))
      }
    }
  }, [authFiles, isPageReady, isAuthenticated])

  async function saveProgressOfGuestTimes() {
    let contentsWithValidations =
      lessonContent
        ?.filter((_content, index) => index <= slideIndex)
        ?.filter((content) => content.validations.length > 0) ?? []
    for (let content of contentsWithValidations) {
      await completeLesson({
        id: query.courseId as string,
        module_id: query.unit_id as string,
        lesson_content_id: content.id as string,
        code: 'really',
      })
    }
  }
  // Handle side effects in useEffect
  useEffect(() => {
    if (!isPageReady || !isAuthenticated) return

    let authFilesWithoutHello = authFiles.filter(
      (file) => !file.name.toLowerCase().startsWith('hello_')
    )
    let authFilesWithHello = authFiles.filter((file) =>
      file.name.toLowerCase().startsWith('hello_')
    )

    let unauthFilesNotSaved = unauthFilesList
      .filter((file) => !authFilesWithoutHello.find((authFile) => authFile.body === file.body))
      .filter((file) => file.body.length > 0)

    if (unauthFilesNotSaved.length) {
      saveProgressOfGuestTimes()
    }
    // Create files that need to be created
    unauthFilesNotSaved.forEach(async (file) => {
      let updateFile = authFiles.find(
        (af) => af.name == file.name && af.extension == file.extension
      )
      if (updateFile) {
        updateFile = { ...updateFile, body: file.body }
        updateStudentFile(updateFile)
        _setActiveFile(undefined)
        setTimeout(() => {
          _setActiveFile(updateFile)
        }, 300)
      } else {
        createStudentFile({ ...file, lessonContentId: slideId, lessonId })
      }
      unauthFileLocalStorageManger(localStorageKey).removeFile(file.id)
    })

    // Delete hello files if needed
    if (unauthFilesNotSaved.length + authFilesWithoutHello.length) {
      authFilesWithHello.forEach((file) => deleteStudentFile(file))
    }
  }, [authFiles.length, unauthFilesList.length, isAuthenticated, slideId, lessonId, isPageReady])

  useEffect(() => {
    if (!isAuthenticated || !files || !lessonId || !slideId || !localstorageCode) return
    let file = getLocalStorageFile(localStorageKey, 'default')
    if (file && file?.body) {
      killLocalStorageFile(localStorageKey, 'default')
      createStudentFile({
        name: file.name,
        extension: file.extension,
        lessonId,
        body: file.body,
        lessonContentId: slideId,
      })
    }
  }, [isAuthenticated, files, lessonId, slideId, localstorageCode])

  const onAddFile = useCallback(
    async (fileName: string): Promise<void> => {
      if (!lessonId || !slideId) return

      const [name, extension] = fileName.split('.')

      try {
        if (!isAuthenticated) {
          const file = unauthFileLocalStorageManger(localStorageKey).addFile(
            {
              id: `${name}-${extension}-${new Date().getTime()}`,
              name,
              extension,
              body: '',
              lessonContentId: slideId,
            },
            'ignoreThisVersion'
          )
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
    (id: string, force: boolean = false): void => {
      if (activeFile?.id === id && !force) return

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
    if (!shouldRunAuthFiles || sandbox) return
    if (activeFile) refetch()
  }, [activeFile, searchParams, shouldRunAuthFiles])

  useEffect(() => {
    if (sandbox) {
      _setActiveFile({ ...DEFAULT_FILE, body: localstorageCode ?? '' })
      _setBarFiles([{ ...DEFAULT_FILE, body: localstorageCode ?? '' }])
    }
  }, [isAuthenticated, searchParams, localstorageCode])

  useEffect(() => {
    const isTypeWithoutFileReset = [
      LessonType.PRACTICAL,
      LessonType.PART_PROJECT,
      LessonType.CONCEPT_EXERCISES,
    ].includes(lesson?.type!)

    if (
      !lessonRef.current ||
      (lessonRef.current?.id === lesson?.id &&
        (activeFile?.id === DEFAULT_FILE_ID || isTypeWithoutFileReset))
    ) {
      lessonRef.current = lesson!
      return
    }

    _setActiveFile(undefined)
    _setBarFiles([])
  }, [lesson, slideId])

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
        case LessonType.START_PROJECT:
          _setActiveFile(unauthFilesList[0])
          break
        case LessonType.QUIZ:
          _setActiveFile(unauthFilesList[0])
          break
        case LessonType.OTHER:
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
    files,
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
