import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { createContext, useContext, ReactNode } from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useAuthContext } from '@root/src/auth/useAuthContext'
import { ILesson } from '@root/src/redux/interfaces/content.interface'
import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { useCompleteLessonMutation } from '@root/src/redux/services/manager/progress-student'
import { useUpdateStudentFileMutation } from '@root/src/redux/services/manager/student-file-debounced'
import {
  useCreateStudentFileMutation,
  useDeleteStudentFileMutation,
  useGetFilesByUnauthUserQuery,
  useGetStudentFilesQuery,
} from '@root/src/redux/services/manager/workspace-student'
import { useSelector } from '@root/src/redux/store'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'
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

export const useFileManagerOrj = () => {
  const lessonRef = useRef<(ILesson & BaseResponseInterface) | null>(null)
  const [files, filesSet] = useState<StudentFile[]>([])
  const guestFilesList = useRef<StudentFile[]>([])
  const { query } = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuthContext()
  let isAuthenticated = !!user
  const [isOpen, setIsOpen] = useState(false)
  const [incVal, incValSet] = useState(0)
  const [barFiles, _setBarFiles] = useState<StudentFile[]>([])
  const [activeFile, _setActiveFile] = useState<StudentFile>()

  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId) || String(query?.lessonId)
  const [createStudentFile] = useCreateStudentFileMutation()
  const [deleteStudentFile] = useDeleteStudentFileMutation()
  const [updateStudentFile] = useUpdateStudentFileMutation()
  const [completeLesson] = useCompleteLessonMutation()

  const { lesson, isLoading: isLessonLoading, lessonContent } = useLessonManager()
  const shouldRunAuthFiles = !!lessonId && !!slideId && isAuthenticated
  const {
    data: authFiles = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetStudentFilesQuery(
    { lessonId: lessonId!, lessonContentId: slideId || '' },
    { skip: !shouldRunAuthFiles }
  )

  const {
    data: guestFiles = [],
    isLoading: IsUnauthFilesLoading,
    isFetching: isUnauthFilesFetching,
  } = useGetFilesByUnauthUserQuery(
    { lessonId: lessonId!, lessonContentId: slideId || '' },
    { skip: !lessonId || !slideId || isAuthenticated }
  )

  fnIncUse(
    90,
    'general',
    files.length,
    incVal,
    guestFilesList.current.length,
    guestFiles.length,
    guestFiles.map((f) => f.name)
  )
  const sandbox = searchParams.get('sandbox')
  const isPageReady = useMemo(
    () =>
      !isLessonLoading &&
      !IsUnauthFilesLoading &&
      !isLoading &&
      !isFetching &&
      !!lessonId &&
      !!slideId,
    [isLessonLoading, IsUnauthFilesLoading, isLoading, isFetching, lessonId, slideId]
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

  useEffect(() => {
    _setBarFiles(files || [])
  }, [files])

  useEffect(() => {
    fnIncUse(147, guestFilesList.current.length)
    if (!isPageReady) {
      return
    }

    const excludedTypes = [
      LessonType.EXERCISE,
      LessonType.START_PROJECT,
      LessonType.QUIZ,
      LessonType.OTHER,
    ]

    //lesson change
    if (lessonRef.current?.id && lesson?.id && lesson?.id !== lessonRef.current?.id) {
      if (
        !excludedTypes.includes(lesson?.type) &&
        !excludedTypes.includes(lessonRef.current?.type) &&
        !lesson?.independent
      ) {
        let files = unauthFileLocalStorageManger(localStorageKey).carryOverFiles(
          getLocalStorageRoomKey(`${lessonRef.current?.id}`),
          guestFiles,
          true
        )
        lessonRef.current = lesson!
        guestFilesList.current = files
        incValSet((v) => v + 1)
        return
      }
    }

    lessonRef.current = lesson!
    let existingFiles = unauthFileLocalStorageManger(localStorageKey).getLocalStorageFiles()
    let accountableExistingFiles = Object.values(existingFiles).filter(
      (file) => file.body.length > 10
    )
    if (accountableExistingFiles.length) {
      guestFilesList.current = Object.values(accountableExistingFiles)
      incValSet((v) => v + 1)
      return
    }
    const _files = unauthFileLocalStorageManger(localStorageKey).getFiles(
      guestFiles,
      'ignoreThisVersion'
    )
    fnIncUse(
      193,
      'guestFilesInit',
      _files.length,
      incVal,
      guestFilesList.current.length,
      guestFiles.length,
      guestFiles.map((f) => f.name),
      _files.map((f) => f.name)
    )
    if (!isAuthenticated) {
      if (!files.length) {
        if (!guestFiles.length) {
          unauthFileLocalStorageManger(localStorageKey).addFile(
            { ...DEFAULT_FILE, lessonContentId: slideId },
            'ignoreThisVersion'
          )
        } else {
          guestFiles.forEach((file) => {
            unauthFileLocalStorageManger(localStorageKey).addFile(file, 'ignoreThisVersion')
          })
        }
      }
    }
    guestFilesList.current = unauthFileLocalStorageManger(localStorageKey).getFiles(
      guestFiles,
      'ignoreThisVersion'
    )

    if (!isAuthenticated && !files.length) {
      fnIncUse(
        227,
        'unauth files set 1',
        files.length,
        incVal,
        guestFilesList.current.length,
        files.length,
        incVal,
        guestFilesList.current.length,
        isAuthenticated,
        files.length > 0,
        guestFilesList.current.length < 0
      )

      filesSet(guestFilesList.current)
    }
  }, [isAuthenticated, guestFiles, localStorageKey, activeFile, isPageReady, lesson, slideId])
  // Move file operations to useEffect
  let filesHash = [...authFiles, ...guestFilesList.current].map((f) => f.id + f.body + ' ').join('')
  fnIncUse(225, 'filesHash', filesHash)
  useEffect(() => {
    if (isAuthenticated || files.length > 0) return
    fnIncUse(
      228,
      'unauth files set 2',
      files.length,
      incVal,
      guestFilesList.current.length,
      files.length,
      incVal,
      guestFilesList.current.length,
      isAuthenticated,
      files.length > 0,
      guestFilesList.current.length < 0
    )
    filesSet(guestFilesList.current)
  }, [filesSet, isAuthenticated, guestFilesList.current.length, files.length])

  useEffect(() => {
    if (!isAuthenticated) return
    fnIncUse(246, 'auth files', files.length, incVal, guestFilesList.current.length)

    let authFilesWithoutHello = authFiles.filter(
      (file) => !file.name.toLowerCase().startsWith('hello_')
    )

    // Just compute the derived state here, no side effects
    let guestFilesNotSaved = guestFilesList.current.filter(
      (file) =>
        !authFilesWithoutHello.find(
          (authFile) => authFile.name === file.name && authFile.extension === file.extension
        )
    )
    let updateNecessary = [...authFilesWithoutHello, ...guestFilesNotSaved]
      .filter((file) => !files.find((f) => f.body === file.body))
      .filter((file) => !files.find((f) => f.body === file.body))
    // console.log('Update necessary files:', files, authFilesWithoutHello, guestFilesNotSaved)
    if (!updateNecessary.length) return
    filesSet(unfreeze([...authFilesWithoutHello, ...guestFilesNotSaved]))
  }, [files, filesHash, isAuthenticated, authFiles, guestFilesList])

  useEffect(() => {
    if (!isAuthenticated || authFiles.length < 2 || !isPageReady) return
    fnIncUse(269, 'unauth files page fln', files.length, incVal, guestFilesList.current.length)
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
    fnIncUse(303, 'auth, handle side eff', files.length, incVal, guestFilesList.current.length)

    let authFilesWithoutHello = authFiles.filter(
      (file) => !file.name.toLowerCase().startsWith('hello_')
    )
    let authFilesWithHello = authFiles.filter((file) =>
      file.name.toLowerCase().startsWith('hello_')
    )

    let guestFilesNotSaved = guestFilesList.current
      .filter((file) => !authFilesWithoutHello.find((authFile) => authFile.body === file.body))
      .filter((file) => file.body.length > 0)

    if (guestFilesNotSaved.length) {
      saveProgressOfGuestTimes()
    }

    fnIncUse(
      321,
      'will create files',
      files.length,
      incVal,
      guestFilesList.current.length,
      guestFiles.length,
      incVal,
      guestFilesList.current.length
    )
    // Create files that need to be created
    guestFilesNotSaved.forEach(async (file) => {
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
    if (guestFilesNotSaved.length + authFilesWithoutHello.length) {
      authFilesWithHello.forEach((file) => deleteStudentFile(file))
    }
  }, [authFiles.length, guestFilesList, isAuthenticated, slideId, lessonId, isPageReady])

  useEffect(() => {
    if (!isAuthenticated || !files || !lessonId || !slideId || !localstorageCode) return
    fnIncUse(356, 'kill default', files.length, incVal, guestFilesList.current.length)
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
  function getFiles() {
    return files
  }
  const onUpdateFile = async (
    id: string,
    body: Partial<Omit<StudentFile, 'lessonId' | 'id'>>
  ): Promise<void> => {
    const filteredBody = Object.fromEntries(
      Object.entries(body).filter(([_, value]) => value !== undefined)
    )

    if (!isAuthenticated) {
      unauthFileLocalStorageManger(localStorageKey).updateFile(id, filteredBody)
      const updatedUnauthFiles = unauthFileLocalStorageManger(localStorageKey).getFiles(
        guestFiles,
        'ignoreThisVersion'
      )

      guestFilesList.current = updatedUnauthFiles
      filesSet(updatedUnauthFiles)
    } else {
      // Run the API update with the complete file data
      await updateStudentFile({
        id,
        ...filteredBody,
        lessonId,
        lessonContentId: slideId,
      })

      const updatedFile = files.find((file) => file.id === id)
      if (updatedFile) {
        const newFile = { ...updatedFile, ...filteredBody }
        filesSet((prevFiles) => prevFiles.map((file) => (file.id === id ? newFile : file)))
      }
    }
  }

  const onDeleteFile = (id: string) => {
    try {
      if (!isAuthenticated) {
        unauthFileLocalStorageManger(localStorageKey).removeFile(id)
      } else {
        deleteStudentFile({ id }).unwrap()
      }

      if (activeFile?.id === id) _setActiveFile(barFiles[0] || files[0])
      _setBarFiles((prev) => prev.filter((file) => file.id !== id))
      filesSet((prevFiles) => prevFiles.filter((file) => file.id !== id))
      tabsLocalStorageManger(tabsMangerLocalStorageKey).removeTab(id)
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  const setActiveFile = useCallback(
    (id: string, force: boolean = false): void => {
      if (activeFile?.id === id && !force) return
      let file = files.find((file) => file.id === id)
      if (!file) return
      tabsLocalStorageManger(tabsMangerLocalStorageKey).addTab(file.id)
      _setActiveFile(file)
      _setBarFiles((prev) => {
        if (prev.find((f) => f.id === file!.id)) return prev
        return [...prev, file!]
      })
    },
    [files, _setActiveFile, _setBarFiles, activeFile?.id]
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
    fnIncUse(442, 'activeFileRefetch', files.length, incVal, guestFilesList.current.length)
    if (activeFile) refetch()
  }, [activeFile, searchParams, shouldRunAuthFiles])

  useEffect(() => {
    fnIncUse(448, files.length, 'sandbox', incVal, guestFilesList.current.length)
    if (sandbox) {
      _setActiveFile({ ...DEFAULT_FILE, body: localstorageCode ?? '' })
      _setBarFiles([{ ...DEFAULT_FILE, body: localstorageCode ?? '' }])
    }
  }, [isAuthenticated, searchParams, localstorageCode])

  useEffect(() => {
    fnIncUse(456, 'lessonSlideChange', files.length, incVal, guestFilesList.current.length)
    const isTypeWithoutFileReset = [LessonType.PRACTICAL, LessonType.PART_PROJECT].includes(
      lesson?.type!
    )

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
    if (!isPageReady || !shouldRunAuthFiles || files.length < 1) return
    fnIncUse(522, 'auth user entry point', files.length, incVal, guestFilesList.current.length)
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
      tabsLocalStorageManger(tabsMangerLocalStorageKey).addTab(files[0].id)

      if (!barFiles.find((file) => file.id === files[0].id)) {
        _setBarFiles((prev) => [...prev, files[0]])
      }
    }
  }, [
    files,
    authFiles,
    shouldRunAuthFiles,
    _setActiveFile,
    _setBarFiles,
    isPageReady,
    tabsMangerLocalStorageKey,
  ])

  /* not authorized user entry point */
  useEffect(() => {
    if (!isPageReady || isAuthenticated) return
    fnIncUse(558, 'unauth user entry point', files.length, incVal, guestFilesList.current.length)

    if (files.length && !files.find((file) => file.id === activeFile?.id)) {
      const lastVisitedTabs = tabsLocalStorageManger(tabsMangerLocalStorageKey).getTabs()
      if (!activeFile?.id) {
        if (lastVisitedTabs.length) {
          const lastVisitedFiles = files.filter((file) => lastVisitedTabs.includes(file.id))

          if (lastVisitedFiles.length) {
            _setActiveFile(lastVisitedFiles[0])
            _setBarFiles((prev) => [...lastVisitedFiles])

            return
          }
        }

        let selectedActiveFile = files[0] || DEFAULT_FILE
        switch (lesson?.type) {
          case LessonType.EXERCISE:
            _setActiveFile(selectedActiveFile)
            break
          case LessonType.START_PROJECT:
            _setActiveFile(selectedActiveFile)
            break
          case LessonType.QUIZ:
            _setActiveFile(selectedActiveFile)
            break
          case LessonType.OTHER:
            _setActiveFile(selectedActiveFile)
            break
          case LessonType.PRACTICAL:
          default:
            if (!activeFile?.id) _setActiveFile(selectedActiveFile)
            break
        }

        tabsLocalStorageManger(tabsMangerLocalStorageKey).addTab(files[0].id)
      }
    }
  }, [lesson, activeFile?.id, files.length, isAuthenticated, isPageReady])

  return useMemo(
    () => ({
      files,
      getFiles,
      isOpen,
      barFiles,
      localStorageKey,
      activeFile: activeFile!,
      preloadedCode: activeFile?.body!,
      isFileLoading: isFetching || isLoading || IsUnauthFilesLoading || isUnauthFilesFetching,
      isFileControllerAvailable: !!activeFile || !!guestFilesList.current.length,

      setIsOpen,
      onAddFile,
      onCloseFile,
      onDeleteFile,
      onUpdateFile,
      setActiveFile,
    }),
    [
      files,
      getFiles,
      isOpen,
      barFiles,
      localStorageKey,
      activeFile,
      isFetching,
      isLoading,
      IsUnauthFilesLoading,
      isUnauthFilesFetching,
      guestFilesList.current.length,
      setIsOpen,
      onAddFile,
      onCloseFile,
      onDeleteFile,
      onUpdateFile,
      setActiveFile,
    ]
  )
}

type FileManagerContextType = ReturnType<typeof useFileManagerOrj> | null
const FileManagerContext = createContext<FileManagerContextType>(null)
export const FileManagerProvider = ({ children }: { children: ReactNode }) => {
  const fileManager = useFileManagerOrj()
  return <FileManagerContext.Provider value={fileManager}>{children}</FileManagerContext.Provider>
}

// Hook to use the file manager instance from any component
export const useFileManager = () => {
  const context = useContext(FileManagerContext)

  if (context === null) {
    throw new Error('useFileManager must be used within a FileManagerProvider')
  }

  return context
}

let fnInc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
function fnIncUse(n: number, ...args: any[]) {
  if (!(n in fnInc)) fnInc[n] = 0
  fnInc[n] = fnInc[n] + 1
  //console.log('fnIncUse', n, fnInc[n], args)
}
let lastRenderTime = 0
