import { useMemo, useRef } from 'react'

import { ILesson } from '@root/src/redux/interfaces/content.interface'
import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { BaseResponseInterface } from '@root/src/utils'

import { getLocalStorageRoomKey } from '../utils/getLocalStorage'

import { unauthFileLocalStorageManger } from './filesLocalstorageManager'
import { FileManagerConfig, DEFAULT_FILE } from './useFileManager_new'

// 3. Hook для localStorage операцій
export const useLocalStorageFiles = (
  localStorageKey: string,
  config: FileManagerConfig,
  unauthFiles: StudentFile[],
  lesson: ILesson | undefined
) => {
  const lessonRef = useRef<(ILesson & BaseResponseInterface) | null>(null)

  return useMemo(() => {
    if (config.isAuthenticated || !config.slideId || !lesson) {
      return []
    }

    // Логіка carry over files для практичних уроків
    if (lessonRef.current?.id && lesson?.id && lesson?.id !== lessonRef.current?.id) {
      if (
        lesson?.type !== LessonType.EXERCISE &&
        lessonRef.current?.type !== LessonType.EXERCISE &&
        !lesson?.independent
      ) {
        const files = unauthFileLocalStorageManger(localStorageKey).carryOverFiles(
          getLocalStorageRoomKey(`${lessonRef.current?.id}`),
          unauthFiles,
          true
        )
        lessonRef.current = lesson!
        return files
      }
    }

    lessonRef.current = lesson!

    // Перевірка існуючих файлів в localStorage
    const existingFiles = unauthFileLocalStorageManger(localStorageKey).getLocalStorageFiles()
    const accountableFiles = Object.values(existingFiles).filter((file) => file.body.length > 10)

    if (accountableFiles.length) {
      return accountableFiles
    }

    // Отримання файлів з сервера або створення дефолтного
    const files = unauthFileLocalStorageManger(localStorageKey).getFiles(
      unauthFiles,
      'ignoreThisVersion'
    )

    if (!files.length) {
      unauthFileLocalStorageManger(localStorageKey).addFile(
        {
          ...DEFAULT_FILE,
          lessonContentId: config.slideId,
        },
        'ignoreThisVersion'
      )
    }

    return unauthFileLocalStorageManger(localStorageKey).getFiles(unauthFiles, 'ignoreThisVersion')
  }, [config.isAuthenticated, config.slideId, unauthFiles, localStorageKey, lesson])
}
