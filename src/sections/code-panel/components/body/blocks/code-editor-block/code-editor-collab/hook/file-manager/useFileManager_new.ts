/* eslint-disable no-console */
import { useCallback, useEffect, useMemo, useReducer } from 'react'

import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'

import {
  getLocalStorageCode,
  getLocalStorageFile,
  killLocalStorageFile,
} from '../utils/getLocalStorage'

import { tabsLocalStorageManger } from './tabsLocalstorageManager'
import { useFileData } from './useFileData'
import { useFileManagerConfig } from './useFileManagerConfig'
import { useFileNavigation } from './useFileNavigation'
import { useFileOperations } from './useFileOperations'
import { useFileSync } from './useFileSync'
import { useLocalStorageFiles } from './useLocalStorageFiles'
import { useProcessedFiles } from './useProcessedFiles'

// ===== CONSTANTS =====
export const DEFAULT_FILE_ID = 'default'
export const DEFAULT_FILE = {
  id: DEFAULT_FILE_ID,
  name: 'index',
  extension: 'html',
  body: '',
}

// ===== TYPES =====
export interface FileManagerState {
  activeFile: StudentFile | null
  barFiles: StudentFile[]
  isOpen: boolean
}

export type FileManagerAction =
  | { type: 'SET_ACTIVE_FILE'; payload: StudentFile | null }
  | { type: 'ADD_BAR_FILE'; payload: StudentFile }
  | { type: 'REMOVE_BAR_FILE'; payload: string }
  | { type: 'SET_BAR_FILES'; payload: StudentFile[] }
  | { type: 'SET_IS_OPEN'; payload: boolean }
  | { type: 'RESET_STATE' }

export interface FileManagerConfig {
  lessonId: string
  slideId: string
  isAuthenticated: boolean
  lessonType?: LessonType
  sandbox?: boolean
}

// ===== REDUCER =====
const fileManagerReducer = (
  state: FileManagerState,
  action: FileManagerAction
): FileManagerState => {
  switch (action.type) {
    case 'SET_ACTIVE_FILE':
      return { ...state, activeFile: action.payload }

    case 'ADD_BAR_FILE':
      if (state.barFiles.find((f) => f.id === action.payload.id)) {
        return state
      }
      return { ...state, barFiles: [...state.barFiles, action.payload] }

    case 'REMOVE_BAR_FILE':
      return {
        ...state,
        barFiles: state.barFiles.filter((f) => f.id !== action.payload),
        activeFile:
          state.activeFile?.id === action.payload
            ? state.barFiles.find((f) => f.id !== action.payload) || null
            : state.activeFile,
      }

    case 'SET_BAR_FILES':
      return { ...state, barFiles: action.payload }

    case 'SET_IS_OPEN':
      return { ...state, isOpen: action.payload }

    case 'RESET_STATE':
      return { activeFile: null, barFiles: [], isOpen: false }

    default:
      return state
  }
}
// ===== MAIN HOOK =====
export const useFileManager = () => {
  // State management з useReducer
  const [state, dispatch] = useReducer(fileManagerReducer, {
    activeFile: null,
    barFiles: [],
    isOpen: false,
  })

  // Конфігурація та localStorage ключі
  const { config, localStorageKey, tabsStorageKey } = useFileManagerConfig()

  // Завантаження даних
  const fileData = useFileData(config)

  // localStorage файли для неавторизованих користувачів
  const unauthFilesList = useLocalStorageFiles(
    localStorageKey,
    config,
    fileData.unauthFiles,
    fileData.lesson
  )

  // Обробка та злиття файлів
  const files = useProcessedFiles(fileData.authFiles, unauthFilesList, config.isAuthenticated)

  console.log('Files:', files)
  // CRUD операції
  const fileOperations = useFileOperations(config, localStorageKey, tabsStorageKey)

  // Синхронізація файлів при авторизації
  useFileSync(
    config,
    localStorageKey,
    fileData.authFiles,
    unauthFilesList,
    fileData.lessonContent,
    fileData.isPageReady
  )

  // Навігація по файлам та табам
  const navigation = useFileNavigation(files, unauthFilesList, config, tabsStorageKey, dispatch)

  // Sandbox режим
  const localstorageCode = useMemo(() => {
    if (!config.lessonId) return
    return getLocalStorageCode(localStorageKey)
  }, [config.lessonId, localStorageKey])

  useEffect(() => {
    if (config.sandbox) {
      const sandboxFile = { ...DEFAULT_FILE, body: localstorageCode ?? '' }
      dispatch({ type: 'SET_ACTIVE_FILE', payload: sandboxFile })
      dispatch({ type: 'SET_BAR_FILES', payload: [sandboxFile] })
    }
  }, [config.sandbox, localstorageCode])

  // Очищення стану при зміні уроку/слайду
  useEffect(() => {
    dispatch({ type: 'RESET_STATE' })
  }, [config.lessonId])

  useEffect(() => {
    dispatch({ type: 'SET_ACTIVE_FILE', payload: null })
    dispatch({ type: 'SET_BAR_FILES', payload: [] })
  }, [config.slideId])

  // Обробка localStorage файлу при авторизації
  useEffect(() => {
    if (
      !config.isAuthenticated ||
      !files ||
      !config.lessonId ||
      !config.slideId ||
      !localstorageCode
    )
      return

    const file = getLocalStorageFile(localStorageKey, 'default')
    if (file?.body) {
      killLocalStorageFile(localStorageKey, 'default')
      fileOperations
        .createFile(`${file.name}.${file.extension}`)
        .catch((error) => console.error('Failed to create file from localStorage:', error))
    }
  }, [config.isAuthenticated, files, config.lessonId, config.slideId, localstorageCode])

  // Wrapper функції для зовнішнього API
  const onAddFile = useCallback(
    async (fileName: string): Promise<void> => {
      try {
        const newFile = await fileOperations.createFile(fileName)
        if (newFile) {
          dispatch({ type: 'SET_ACTIVE_FILE', payload: newFile })
          dispatch({ type: 'ADD_BAR_FILE', payload: newFile })
          tabsLocalStorageManger(tabsStorageKey).addTab(newFile.id)
        }
      } catch (error) {
        console.error('Failed to add file:', error)
        throw error
      }
    },
    [fileOperations.createFile, tabsStorageKey]
  )

  const onUpdateFile = useCallback(
    async (id: string, updates: Partial<Omit<StudentFile, 'lessonId' | 'id'>>): Promise<void> => {
      await fileOperations.updateFile(id, updates)
    },
    [fileOperations.updateFile]
  )

  const onDeleteFile = useCallback(
    async (id: string) => {
      try {
        await fileOperations.deleteFile(id)
        dispatch({ type: 'REMOVE_BAR_FILE', payload: id })
      } catch (error) {
        console.error('Failed to delete file:', error)
        throw error
      }
    },
    [fileOperations.deleteFile]
  )

  const setIsOpen = useCallback((isOpen: boolean) => {
    dispatch({ type: 'SET_IS_OPEN', payload: isOpen })
  }, [])

  // Refetch при зміні активного файлу для авторизованих користувачів
  useEffect(() => {
    if (!config.isAuthenticated || config.sandbox || !state.activeFile) return
    fileData.refetchAuthFiles()
  }, [state.activeFile, config.isAuthenticated, config.sandbox])

  return {
    // State
    files,
    isOpen: state.isOpen,
    barFiles: state.barFiles,
    activeFile: state.activeFile,
    localStorageKey,

    // Computed
    preloadedCode: state.activeFile?.body || '',
    isFileLoading: fileData.isLoading || fileData.isFetching,
    isFileControllerAvailable: !!state.activeFile || !!unauthFilesList.length,

    // Actions
    setIsOpen,
    onAddFile,
    onCloseFile: navigation.closeFile,
    onDeleteFile,
    onUpdateFile,
    setActiveFile: navigation.setActiveFile,
  }
}
