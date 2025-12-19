import { useCallback, useEffect, useMemo, useRef, useReducer } from 'react'
import { createContext, useContext, ReactNode } from 'react'

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
import { useUpdateStudentFileMutation } from '@root/src/redux/services/manager/student-file-debounced'
import {
  useCreateStudentFileMutation,
  useDeleteStudentFileMutation,
  useGetFilesByUnauthUserQuery,
  useGetStudentFilesQuery,
} from '@root/src/redux/services/manager/workspace-student'
import { useSelector } from '@root/src/redux/store'
import { BaseResponseInterface } from '@root/src/utils'
import { unfreeze } from '@root/src/utils/unfreeze'

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

// Debounce utility
function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }) as T
}

// State interface for the reducer
interface FileManagerState {
  files: StudentFile[]
  unauthFilesList: StudentFile[]
  isOpen: boolean
  barFiles: StudentFile[]
  activeFile?: StudentFile
  isProcessing: boolean
  lastAuthState: boolean | null
  lastLessonId: string | null
  lastSlideId: string | null
}

type FileManagerAction =
  | { type: 'SET_FILES'; payload: StudentFile[] }
  | { type: 'SET_UNAUTH_FILES'; payload: StudentFile[] }
  | { type: 'SET_IS_OPEN'; payload: boolean }
  | { type: 'SET_BAR_FILES'; payload: StudentFile[] }
  | { type: 'ADD_BAR_FILE'; payload: StudentFile }
  | { type: 'REMOVE_BAR_FILE'; payload: string }
  | { type: 'SET_ACTIVE_FILE'; payload: StudentFile | undefined }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'UPDATE_TRACKING'; payload: { authState: boolean; lessonId: string; slideId: string } }
  | { type: 'RESET_FOR_LESSON_CHANGE' }
  | { type: 'MERGE_FILES'; payload: { authFiles: StudentFile[]; unauthFiles: StudentFile[] } }

const initialState: FileManagerState = {
  files: [],
  unauthFilesList: [],
  isOpen: false,
  barFiles: [],
  activeFile: undefined,
  isProcessing: false,
  lastAuthState: null,
  lastLessonId: null,
  lastSlideId: null,
}

function fileManagerReducer(state: FileManagerState, action: FileManagerAction): FileManagerState {
  switch (action.type) {
    case 'SET_FILES':
      return { ...state, files: action.payload }

    case 'SET_UNAUTH_FILES':
      return { ...state, unauthFilesList: action.payload }

    case 'SET_IS_OPEN':
      return { ...state, isOpen: action.payload }

    case 'SET_BAR_FILES':
      return { ...state, barFiles: action.payload }

    case 'ADD_BAR_FILE':
      const exists = state.barFiles.find((f) => f.id === action.payload.id)
      if (exists) return state
      return { ...state, barFiles: [...state.barFiles, action.payload] }

    case 'REMOVE_BAR_FILE':
      return {
        ...state,
        barFiles: state.barFiles.filter((f) => f.id !== action.payload),
        activeFile:
          state.activeFile?.id === action.payload
            ? state.barFiles.find((f) => f.id !== action.payload)
            : state.activeFile,
      }

    case 'SET_ACTIVE_FILE':
      return { ...state, activeFile: action.payload }

    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload }

    case 'UPDATE_TRACKING':
      return {
        ...state,
        lastAuthState: action.payload.authState,
        lastLessonId: action.payload.lessonId,
        lastSlideId: action.payload.slideId,
      }

    case 'RESET_FOR_LESSON_CHANGE':
      return {
        ...state,
        activeFile: undefined,
        barFiles: [],
      }

    case 'MERGE_FILES':
      const { authFiles, unauthFiles } = action.payload
      const authFilesWithoutHello = authFiles.filter(
        (file) => !file.name.toLowerCase().startsWith('hello_')
      )
      const unauthFilesNotSaved = unauthFiles.filter(
        (file) =>
          !authFilesWithoutHello.find(
            (authFile) => authFile.name === file.name && authFile.extension === file.extension
          )
      )
      return {
        ...state,
        files: unfreeze([...authFilesWithoutHello, ...unauthFilesNotSaved]),
      }

    default:
      return state
  }
}

export const useFileManagerOrj = () => {
  const [state, dispatch] = useReducer(fileManagerReducer, initialState)
  const abortControllerRef = useRef<AbortController | null>(null)
  const asyncQueueRef = useRef<Promise<any>>(Promise.resolve())
  const lessonRef = useRef<(ILesson & BaseResponseInterface) | null>(null)
  const isInitializedRef = useRef(false)

  const { query } = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuthContext()
  const isAuthenticated = !!user

  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId) || String(query?.lessonId)

  const [createStudentFile] = useCreateStudentFileMutation()
  const [deleteStudentFile] = useDeleteStudentFileMutation()
  const [updateStudentFile] = useUpdateStudentFileMutation()
  const [completeLesson] = useCompleteLessonMutation()

  // API queries with proper skip conditions
  const {
    data: lesson,
    isLoading: isLessonLoading,
    isFetching: isLessonFetching,
  } = useGetLessonStudentWithoutContentsQuery({ id: lessonId! }, { skip: !lessonId })

  const { data: lessonContent } = useGetLessonContentStudentQuery(
    { id: query.lessonId as string },
    { skip: !lessonId }
  )

  const shouldRunAuthFiles = !!lessonId && !!slideId && isAuthenticated
  const {
    refetch,
    isLoading: isAuthFilesLoading,
    isFetching: isAuthFilesFetching,
    data: authFiles = [],
  } = useGetStudentFilesQuery(
    { lessonId: lessonId!, lessonContentId: slideId || '' },
    { skip: !shouldRunAuthFiles }
  )

  const {
    data: unauthFiles = [],
    isLoading: isUnauthFilesLoading,
    isFetching: isUnauthFilesFetching,
  } = useGetFilesByUnauthUserQuery(
    { lessonId: lessonId!, lessonContentId: slideId || '' },
    { skip: !lessonId || !slideId || isAuthenticated }
  )

  const sandbox = searchParams.get('sandbox')
  const isPageReady =
    !isLessonLoading && !isUnauthFilesLoading && !isAuthFilesLoading && !isAuthFilesFetching

  // Memoized localStorage keys
  const { localStorageKey, tabsMangerLocalStorageKey } = useMemo(() => {
    let localStorageKey

    switch (lesson?.type) {
      case LessonType.EXERCISE:
      case LessonType.START_PROJECT:
      case LessonType.QUIZ:
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

  const queueAsyncOperation = useCallback(<T,>(operation: () => Promise<T>): Promise<T> => {
    asyncQueueRef.current = asyncQueueRef.current.then(
      () => operation(),
      () => operation() // Run even if previous operation failed
    )
    return asyncQueueRef.current
  }, [])

  // Debounced state updates
  const debouncedMergeFiles = useMemo(
    () =>
      debounce((authFiles: StudentFile[], unauthFiles: StudentFile[]) => {
        if (state.isProcessing) return
        dispatch({ type: 'MERGE_FILES', payload: { authFiles, unauthFiles } })
      }, 100),
    [state.isProcessing]
  )

  // Track significant state changes
  useEffect(() => {
    const hasSignificantChange =
      state.lastAuthState !== isAuthenticated ||
      state.lastLessonId !== lessonId ||
      state.lastSlideId !== slideId

    if (hasSignificantChange && lessonId && slideId) {
      dispatch({
        type: 'UPDATE_TRACKING',
        payload: { authState: isAuthenticated, lessonId, slideId },
      })
    }
  }, [isAuthenticated, lessonId, slideId])

  // Handle lesson/slide changes
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true
      return
    }

    const lessonChanged = state.lastLessonId && state.lastLessonId !== lessonId
    const slideChanged = state.lastSlideId && state.lastSlideId !== slideId

    if (lessonChanged) {
      dispatch({ type: 'RESET_FOR_LESSON_CHANGE' })
    }

    const isTypeWithoutFileReset = [LessonType.PRACTICAL, LessonType.PART_PROJECT].includes(
      lesson?.type!
    )

    if (slideChanged && !isTypeWithoutFileReset) {
      dispatch({ type: 'SET_ACTIVE_FILE', payload: undefined })
      dispatch({ type: 'SET_BAR_FILES', payload: [] })
    }

    lessonRef.current = lesson!
  }, [lessonId, slideId, lesson])

  // Handle unauth files loading and localStorage management
  useEffect(() => {
    if (
      isUnauthFilesFetching ||
      isUnauthFilesLoading ||
      isLessonLoading ||
      isLessonFetching ||
      !slideId
    ) {
      return
    }
    queueAsyncOperation(async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      abortControllerRef.current = new AbortController()

      try {
        const excludedTypes = [
          LessonType.EXERCISE,
          LessonType.START_PROJECT,
          LessonType.QUIZ,
          LessonType.OTHER,
        ]

        // Handle lesson transitions with file carryover
        if (lessonRef.current?.id && lesson?.id && lesson?.id !== lessonRef.current?.id) {
          if (
            !excludedTypes.includes(lesson?.type) &&
            !excludedTypes.includes(lessonRef.current?.type) &&
            !lesson?.independent
          ) {
            const files = unauthFileLocalStorageManger(localStorageKey).carryOverFiles(
              getLocalStorageRoomKey(`${lessonRef.current?.id}`),
              unauthFiles,
              true
            )
            lessonRef.current = lesson!
            dispatch({ type: 'SET_UNAUTH_FILES', payload: files })
            return
          }
        }

        lessonRef.current = lesson!

        // Check existing localStorage files first
        const existingFiles = unauthFileLocalStorageManger(localStorageKey).getLocalStorageFiles()
        const accountableExistingFiles = Object.values(existingFiles).filter(
          (file) => file.body.length > 10
        )

        if (accountableExistingFiles.length) {
          dispatch({ type: 'SET_UNAUTH_FILES', payload: accountableExistingFiles })
          return
        }

        // Get files from server or create default
        const files = unauthFileLocalStorageManger(localStorageKey).getFiles(
          unauthFiles,
          'ignoreThisVersion'
        )

        if (!isAuthenticated && !files.length) {
          unauthFileLocalStorageManger(localStorageKey).addFile(
            { ...DEFAULT_FILE, lessonContentId: slideId },
            'ignoreThisVersion'
          )
        }

        const finalFiles = unauthFileLocalStorageManger(localStorageKey).getFiles(
          unauthFiles,
          'ignoreThisVersion'
        )
        dispatch({ type: 'SET_UNAUTH_FILES', payload: finalFiles })
      } catch (error: any) {
        //console.error('Error loading unauth files:', error)
      }
    })

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [isAuthenticated, unauthFiles, localStorageKey, lesson, slideId])

  // Handle file merging for unauthenticated users
  useEffect(() => {
    if (isAuthenticated || state.files.length > 0 || state.unauthFilesList.length === 0) return

    dispatch({ type: 'SET_FILES', payload: state.unauthFilesList })
  }, [isAuthenticated, state.unauthFilesList, state.files.length])

  // Handle file merging for authenticated users
  useEffect(() => {
    if (!isAuthenticated || !isPageReady) return

    debouncedMergeFiles(authFiles, state.unauthFilesList)
  }, [isAuthenticated, authFiles, state.unauthFilesList, isPageReady])

  // Handle duplicate file cleanup for authenticated users
  useEffect(() => {
    if (!isAuthenticated || authFiles.length < 2 || !isPageReady || state.isProcessing) return

    queueAsyncOperation(async () => {
      const searched = new Set(authFiles.map((f) => `${f.name}.${f.extension}`))
      if (searched.size < authFiles.length) {
        const toDelete = []
        for (const filename of searched) {
          const duplicates = authFiles.filter((f) => `${f.name}.${f.extension}` === filename)
          if (duplicates.length > 1) {
            duplicates.sort((a, b) => b.body.length - a.body.length)
            toDelete.push(...duplicates.slice(1).map((f) => f.id))
          }
        }
        if (toDelete.length) {
          await Promise.all(toDelete.map((id) => deleteStudentFile({ id }).unwrap()))
        }
      }
    })
  }, [authFiles, isPageReady, isAuthenticated, state.isProcessing])

  // Save progress and sync files for newly authenticated users
  useEffect(() => {
    if (!isPageReady || !isAuthenticated || state.isProcessing) return

    const authFilesWithoutHello = authFiles.filter(
      (file) => !file.name.toLowerCase().startsWith('hello_')
    )
    const authFilesWithHello = authFiles.filter((file) =>
      file.name.toLowerCase().startsWith('hello_')
    )

    const unauthFilesNotSaved = state.unauthFilesList
      .filter((file) => !authFilesWithoutHello.find((authFile) => authFile.body === file.body))
      .filter((file) => file.body.length > 0)

    if (unauthFilesNotSaved.length === 0) return

    dispatch({ type: 'SET_PROCESSING', payload: true })

    queueAsyncOperation(async () => {
      try {
        // Save progress first
        if (lessonContent) {
          const contentsWithValidations = lessonContent
            .filter((_, index) => index <= slideIndex)
            .filter((content) => content.validations.length > 0)

          for (const content of contentsWithValidations) {
            await completeLesson({
              id: query.courseId as string,
              module_id: query.unit_id as string,
              lesson_content_id: content.id as string,
              code: 'really',
            })
          }
        }

        // Process files sequentially to avoid race conditions
        for (const file of unauthFilesNotSaved) {
          const updateFile = authFiles.find(
            (af) => af.name === file.name && af.extension === file.extension
          )

          if (updateFile) {
            await updateStudentFile({ ...updateFile, body: file.body })
            dispatch({ type: 'SET_ACTIVE_FILE', payload: undefined })
            // Brief delay to ensure state update
            await new Promise((resolve) => setTimeout(resolve, 300))
            dispatch({ type: 'SET_ACTIVE_FILE', payload: { ...updateFile, body: file.body } })
          } else {
            await createStudentFile({ ...file, lessonContentId: slideId, lessonId })
          }

          unauthFileLocalStorageManger(localStorageKey).removeFile(file.id)
        }

        // Delete hello files if needed
        if (unauthFilesNotSaved.length + authFilesWithoutHello.length > 0) {
          await Promise.all(authFilesWithHello.map((file) => deleteStudentFile(file).unwrap()))
        }
      } finally {
        dispatch({ type: 'SET_PROCESSING', payload: false })
      }
    })
  }, [
    authFiles,
    state.unauthFilesList,
    isAuthenticated,
    slideId,
    lessonId,
    isPageReady,
    state.isProcessing,
  ])

  // Handle localStorage default file migration
  useEffect(() => {
    if (!isAuthenticated || !state.files || !lessonId || !slideId || !localstorageCode) return

    queueAsyncOperation(async () => {
      const file = getLocalStorageFile(localStorageKey, 'default')
      if (file?.body) {
        killLocalStorageFile(localStorageKey, 'default')
        await createStudentFile({
          name: file.name,
          extension: file.extension,
          lessonId,
          body: file.body,
          lessonContentId: slideId,
        })
      }
    })
  }, [isAuthenticated, state.files, lessonId, slideId, localstorageCode])

  // Handle sandbox mode
  useEffect(() => {
    if (sandbox) {
      const sandboxFile = { ...DEFAULT_FILE, body: localstorageCode ?? '' }
      dispatch({ type: 'SET_ACTIVE_FILE', payload: sandboxFile })
      dispatch({ type: 'SET_BAR_FILES', payload: [sandboxFile] })
    }
  }, [sandbox, localstorageCode])

  // Set active file for authenticated users
  useEffect(() => {
    if (isAuthFilesLoading || isAuthFilesFetching || !shouldRunAuthFiles || state.files.length < 1)
      return

    if (state.files[0] && !state.files.find((file) => file.id === state.activeFile?.id)) {
      const lastVisitedTabs = tabsLocalStorageManger(tabsMangerLocalStorageKey).getTabs()

      if (lastVisitedTabs.length) {
        const lastVisitedFiles = state.files.filter((file) => lastVisitedTabs.includes(file.id))
        if (lastVisitedFiles.length) {
          dispatch({ type: 'SET_ACTIVE_FILE', payload: lastVisitedFiles[0] })
          dispatch({ type: 'SET_BAR_FILES', payload: lastVisitedFiles })
          return
        }
      }

      dispatch({ type: 'SET_ACTIVE_FILE', payload: state.files[0] })
      dispatch({ type: 'ADD_BAR_FILE', payload: state.files[0] })
      tabsLocalStorageManger(tabsMangerLocalStorageKey).addTab(state.files[0].id)
    }
  }, [
    state.files,
    shouldRunAuthFiles,
    isAuthFilesLoading,
    isAuthFilesFetching,
    tabsMangerLocalStorageKey,
  ])

  // Set active file for unauthenticated users
  useEffect(() => {
    if (isUnauthFilesLoading || isUnauthFilesFetching || isAuthenticated) return

    if (
      state.unauthFilesList[0] &&
      !state.unauthFilesList.find((file) => file.id === state.activeFile?.id)
    ) {
      const lastVisitedTabs = tabsLocalStorageManger(tabsMangerLocalStorageKey).getTabs()

      if (lastVisitedTabs.length) {
        const lastVisitedFiles = state.unauthFilesList.filter((file) =>
          lastVisitedTabs.includes(file.id)
        )
        if (lastVisitedFiles.length) {
          dispatch({ type: 'SET_ACTIVE_FILE', payload: lastVisitedFiles[0] })
          dispatch({ type: 'SET_BAR_FILES', payload: lastVisitedFiles })
          return
        }
      }

      const shouldSetActive =
        [LessonType.EXERCISE, LessonType.START_PROJECT, LessonType.QUIZ, LessonType.OTHER].includes(
          lesson?.type!
        ) || !state.activeFile

      if (shouldSetActive) {
        dispatch({ type: 'SET_ACTIVE_FILE', payload: state.unauthFilesList[0] })
      }
      let barFiles: StudentFile[] = []
      const prevFilteredBarfiles = state.barFiles.filter((file) =>
        state.unauthFilesList.find((f) => f.id === file.id)
      )
      const firstFile = state.unauthFilesList[0]
      if (!state.barFiles.find((file) => file.id === firstFile.id)) {
        barFiles = [...prevFilteredBarfiles, firstFile]
      } else {
        barFiles = prevFilteredBarfiles
      }

      dispatch({ type: 'SET_BAR_FILES', payload: barFiles })
      tabsLocalStorageManger(tabsMangerLocalStorageKey).addTab(state.unauthFilesList[0].id)
    }
  }, [
    lesson,
    state.activeFile,
    state.unauthFilesList,
    isAuthenticated,
    isUnauthFilesLoading,
    isUnauthFilesFetching,
  ])

  // Refetch when active file changes
  useEffect(() => {
    if (!shouldRunAuthFiles || sandbox) return
    if (state.activeFile) refetch()
  }, [state.activeFile, shouldRunAuthFiles, sandbox])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // Callback functions
  const onAddFile = useCallback(
    async (fileName: string): Promise<void> => {
      if (!lessonId || !slideId) return

      const [name, extension] = fileName.split('.')

      return queueAsyncOperation(async () => {
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
            dispatch({ type: 'SET_ACTIVE_FILE', payload: file })
            dispatch({ type: 'ADD_BAR_FILE', payload: file! })
            tabsLocalStorageManger(tabsMangerLocalStorageKey).addTab(file!.id)
            return
          }

          await createStudentFile({ name, extension, lessonId, body: '', lessonContentId: slideId })
        } catch (e: any) {
          throw new Error(e.message)
        }
      })
    },
    [lessonId, slideId, isAuthenticated, localStorageKey, tabsMangerLocalStorageKey]
  )

  const onUpdateFile = useCallback(
    async (id: string, body: Partial<Omit<StudentFile, 'lessonId' | 'id'>>): Promise<void> => {
      const filteredBody = Object.fromEntries(
        Object.entries(body).filter(([_, value]) => value !== undefined)
      )

      return queueAsyncOperation(async () => {
        if (!isAuthenticated) {
          unauthFileLocalStorageManger(localStorageKey).updateFile(id, filteredBody)
          const updatedUnauthFiles = unauthFileLocalStorageManger(localStorageKey).getFiles(
            unauthFiles,
            'ignoreThisVersion'
          )

          dispatch({ type: 'SET_UNAUTH_FILES', payload: updatedUnauthFiles })
          dispatch({ type: 'SET_FILES', payload: updatedUnauthFiles })
        } else {
          await updateStudentFile({
            id,
            ...filteredBody,
            lessonId,
            lessonContentId: slideId,
          })

          // Optimistically update local state
          const updatedFile = state.files.find((file) => file.id === id)
          if (updatedFile) {
            const newFile = { ...updatedFile, ...filteredBody }
            const newFiles = state.files.map((file) => (file.id === id ? newFile : file))
            dispatch({ type: 'SET_FILES', payload: newFiles })
          }
        }
      })
    },
    [isAuthenticated, localStorageKey, lessonId, slideId, state.files, unauthFiles]
  )

  const onDeleteFile = useCallback(
    (id: string) => {
      return queueAsyncOperation(async () => {
        try {
          if (!isAuthenticated) {
            unauthFileLocalStorageManger(localStorageKey).removeFile(id)
          } else {
            await deleteStudentFile({ id }).unwrap()
          }

          if (state.activeFile?.id === id) {
            const remainingFiles = state.barFiles.filter((f) => f.id !== id)
            dispatch({ type: 'SET_ACTIVE_FILE', payload: remainingFiles[0] || state.files[0] })
          }

          dispatch({ type: 'REMOVE_BAR_FILE', payload: id })
          tabsLocalStorageManger(tabsMangerLocalStorageKey).removeTab(id)
        } catch (e: any) {
          throw new Error(e.message)
        }
      })
    },
    [
      isAuthenticated,
      localStorageKey,
      state.activeFile,
      state.barFiles,
      state.files,
      tabsMangerLocalStorageKey,
    ]
  )

  const setActiveFile = useCallback(
    (id: string, force: boolean = false): void => {
      if (state.activeFile?.id === id && !force) return

      const file = isAuthenticated
        ? state.files.find((f) => f.id === id)
        : state.unauthFilesList.find((f) => f.id === id)

      if (!file) return

      dispatch({ type: 'SET_ACTIVE_FILE', payload: file })

      if (!state.barFiles.find((f) => f.id === id)) {
        dispatch({ type: 'ADD_BAR_FILE', payload: file })
        tabsLocalStorageManger(tabsMangerLocalStorageKey).addTab(file.id)
      }
    },
    [
      state.files,
      state.barFiles,
      state.activeFile,
      state.unauthFilesList,
      isAuthenticated,
      tabsMangerLocalStorageKey,
    ]
  )

  const onCloseFile = useCallback(
    (id: string) => {
      const remainingFiles = state.barFiles.filter((f) => f.id !== id)
      if (state.activeFile?.id === id) {
        dispatch({ type: 'SET_ACTIVE_FILE', payload: remainingFiles[0] })
      }
      dispatch({ type: 'REMOVE_BAR_FILE', payload: id })
      tabsLocalStorageManger(tabsMangerLocalStorageKey).removeTab(id)
    },
    [state.barFiles, state.activeFile, tabsMangerLocalStorageKey]
  )

  const getFiles = useCallback(() => state.files, [state.files])

  return {
    files: state.files,
    getFiles,
    isOpen: state.isOpen,
    barFiles: state.barFiles,
    localStorageKey,
    activeFile: state.activeFile!,
    preloadedCode: state.activeFile?.body!,
    isFileLoading:
      isAuthFilesFetching ||
      isAuthFilesLoading ||
      isUnauthFilesLoading ||
      isUnauthFilesFetching ||
      state.isProcessing,
    isLessonLoading: isLessonLoading || isLessonFetching,
    isFileControllerAvailable: state.files.length > 0,
    isPageReady,
    setActiveFile,
    onAddFile,
    onUpdateFile,
    onDeleteFile,
    onCloseFile,
    toggleOpen: (isOpen: boolean) => dispatch({ type: 'SET_IS_OPEN', payload: isOpen }),
    showInConsole: false, // Assuming this is needed based on context
    lesson,
    lessonContent,
  }
}

// Create context for FileManager
interface FileManagerContextValue extends ReturnType<typeof useFileManagerOrj> {}

const FileManagerContext = createContext<FileManagerContextValue | undefined>(undefined)

export function FileManagerProvider({ children }: { children: ReactNode }) {
  const fileManagerValue = useFileManagerOrj()
  return (
    <FileManagerContext.Provider value={fileManagerValue}>{children}</FileManagerContext.Provider>
  )
}

// Hook to use the FileManager context
export function useFileManager() {
  const context = useContext(FileManagerContext)
  if (context === undefined) {
    throw new Error('useFileManager must be used within a FileManagerProvider')
  }
  return context
}
