/* eslint-disable no-console */
import { useCallback, useEffect, useMemo } from 'react'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'

import { tabsLocalStorageManger } from './tabsLocalstorageManager'
import { FileManagerConfig, FileManagerAction } from './useFileManager_new'

// 7. Hook для управління табами та активним файлом
export const useFileNavigation = (
  files: StudentFile[],
  unauthFilesList: StudentFile[],
  config: FileManagerConfig,
  tabsStorageKey: string,
  dispatch: React.Dispatch<FileManagerAction>
) => {
  const tabsManager = useMemo(() => tabsLocalStorageManger(tabsStorageKey), [tabsStorageKey])

  const setActiveFile = useCallback(
    (id: string, force: boolean = false): void => {
      const targetFiles = config.isAuthenticated ? files : unauthFilesList
      const file = targetFiles.find((f) => f.id === id)
      if (!file) return

      dispatch({ type: 'SET_ACTIVE_FILE', payload: file })
      dispatch({ type: 'ADD_BAR_FILE', payload: file })
      tabsManager.addTab(file.id)
    },
    [files, unauthFilesList, config.isAuthenticated, tabsManager, dispatch]
  )

  const closeFile = useCallback(
    (id: string) => {
      dispatch({ type: 'REMOVE_BAR_FILE', payload: id })
      tabsManager.removeTab(id)
    },
    [tabsManager, dispatch]
  )

  useEffect(() => {
    if (!files.length || !config.isAuthenticated) return

    const lastVisitedTabs = tabsManager.getTabs()
    const lastVisitedFiles = files.filter((file) => lastVisitedTabs.includes(file.id))

    if (lastVisitedFiles.length) {
      dispatch({ type: 'SET_ACTIVE_FILE', payload: lastVisitedFiles[0] })
      dispatch({ type: 'SET_BAR_FILES', payload: lastVisitedFiles })
    } else {
      dispatch({ type: 'SET_ACTIVE_FILE', payload: files[0] })
      dispatch({ type: 'ADD_BAR_FILE', payload: files[0] })
      tabsManager.addTab(files[0].id)
    }
  }, [config.isAuthenticated, tabsManager, dispatch])

  useEffect(() => {
    if (!unauthFilesList.length || config.isAuthenticated) return

    const lastVisitedTabs = tabsManager.getTabs()
    const lastVisitedFiles = unauthFilesList.filter((file) => lastVisitedTabs.includes(file.id))

    console.log('useFileNavsdfsdfigation effect triggered ', lastVisitedTabs)
    console.log('useFileNavsdfsdfigation effect triggered ', lastVisitedFiles)
    console.log('useFileNavsdfsdfigation effect triggered ', unauthFilesList)

    if (lastVisitedFiles.length) {
      dispatch({ type: 'SET_ACTIVE_FILE', payload: lastVisitedFiles[0] })
      dispatch({ type: 'SET_BAR_FILES', payload: lastVisitedFiles })
    } else {
      dispatch({ type: 'SET_ACTIVE_FILE', payload: unauthFilesList[0] })
      dispatch({ type: 'ADD_BAR_FILE', payload: unauthFilesList[0] })
      tabsManager.addTab(unauthFilesList[0].id)
    }
  }, [config.isAuthenticated, tabsManager, dispatch])

  return { setActiveFile, closeFile }
}

// const useFileNavigation = (
//   files: StudentFile[],
//   unauthFilesList: StudentFile[],
//   config: FileManagerConfig,
//   tabsStorageKey: string,
//   dispatch: React.Dispatch<FileManagerAction>
// ) => {
//   const setActiveFile = useCallback(
//     (id: string, force: boolean = false): void => {
//       const targetFiles = config.isAuthenticated ? files : unauthFilesList
//       const file = targetFiles.find((f) => f.id === id)

//       if (!file) return

//       dispatch({ type: 'SET_ACTIVE_FILE', payload: file })
//       dispatch({ type: 'ADD_BAR_FILE', payload: file })
//       tabsLocalStorageManger(tabsStorageKey).addTab(file.id)
//     },
//     [files, unauthFilesList, config.isAuthenticated, tabsStorageKey, dispatch]
//   )

//   const closeFile = useCallback(
//     (id: string) => {
//       dispatch({ type: 'REMOVE_BAR_FILE', payload: id })
//       tabsLocalStorageManger(tabsStorageKey).removeTab(id)
//     },
//     [tabsStorageKey, dispatch]
//   )

//   // Ініціалізація активного файлу для авторизованих користувачів
//   useEffect(() => {
//     console.log('useFileNavigation effect triggered')
//     if (!files.length || config.isAuthenticated === false) return

//     const lastVisitedTabs = tabsLocalStorageManger(tabsStorageKey).getTabs()

//     if (lastVisitedTabs.length) {
//       const lastVisitedFiles = files.filter((file) => lastVisitedTabs.includes(file.id))

//       if (lastVisitedFiles.length) {
//         dispatch({ type: 'SET_ACTIVE_FILE', payload: lastVisitedFiles[0] })
//         dispatch({ type: 'SET_BAR_FILES', payload: lastVisitedFiles })
//         return
//       }
//     }

//     dispatch({ type: 'SET_ACTIVE_FILE', payload: files[0] })
//     dispatch({ type: 'ADD_BAR_FILE', payload: files[0] })
//     tabsLocalStorageManger(tabsStorageKey).addTab(files[0].id)
//   }, [config.isAuthenticated, tabsStorageKey, dispatch])

//   // Ініціалізація активного файлу для неавторизованих користувачів
//   useEffect(() => {
//     if (!unauthFilesList.length || config.isAuthenticated === true) return

//     const lastVisitedTabs = tabsLocalStorageManger(tabsStorageKey).getTabs()

//     if (lastVisitedTabs.length) {
//       const lastVisitedFiles = unauthFilesList.filter((file) => lastVisitedTabs.includes(file.id))

//       if (lastVisitedFiles.length) {
//         dispatch({ type: 'SET_ACTIVE_FILE', payload: lastVisitedFiles[0] })
//         dispatch({ type: 'SET_BAR_FILES', payload: lastVisitedFiles })
//         return
//       }
//     }

//     dispatch({ type: 'SET_ACTIVE_FILE', payload: unauthFilesList[0] })
//     dispatch({ type: 'ADD_BAR_FILE', payload: unauthFilesList[0] })
//     tabsLocalStorageManger(tabsStorageKey).addTab(unauthFilesList[0].id)
//   }, [unauthFilesList, config.isAuthenticated, tabsStorageKey, dispatch])

//   return { setActiveFile, closeFile }
// }
