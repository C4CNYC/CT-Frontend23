/* eslint-disable no-console */
import { useCallback, useEffect } from 'react'

import { useRouter } from 'next/router'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { useCompleteLessonMutation } from '@root/src/redux/services/manager/progress-student'
import {
  useCreateStudentFileMutation,
  useDeleteStudentFileMutation,
  useUpdateStudentFileMutation,
} from '@root/src/redux/services/manager/workspace-student'
import { useSelector } from '@root/src/redux/store'

import { unauthFileLocalStorageManger } from './filesLocalstorageManager'
import { FileManagerConfig } from './useFileManager_new'

// 6. Hook для синхронізації auth/unauth файлів
export const useFileSync = (
  config: FileManagerConfig,
  localStorageKey: string,
  authFiles: StudentFile[],
  unauthFilesList: StudentFile[],
  lessonContent: any,
  isPageReady: boolean
) => {
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const { query } = useRouter()
  const [completeLesson] = useCompleteLessonMutation()
  const [updateStudentFile] = useUpdateStudentFileMutation()
  const [createStudentFile] = useCreateStudentFileMutation()
  const [deleteStudentFile] = useDeleteStudentFileMutation()

  const saveProgressOfGuest = useCallback(async () => {
    if (!lessonContent) return

    const contentsWithValidations =
      lessonContent
        ?.filter((_: any, index: number) => index <= slideIndex)
        ?.filter((content: any) => content.validations.length > 0) ?? []

    const progressPromises = contentsWithValidations.map((content: any) =>
      completeLesson({
        id: query.courseId as string,
        module_id: query.unit_id as string,
        lesson_content_id: content.id as string,
        code: 'really',
      })
    )

    try {
      await Promise.allSettled(progressPromises)
    } catch (error) {
      console.error('Failed to save guest progress:', error)
    }
  }, [lessonContent, slideIndex, query, completeLesson])

  useEffect(() => {
    if (!isPageReady || !config.isAuthenticated || !authFiles.length) return

    const authFilesWithoutHello = authFiles.filter(
      (file) => !file.name.toLowerCase().startsWith('hello_')
    )
    const authFilesWithHello = authFiles.filter((file) =>
      file.name.toLowerCase().startsWith('hello_')
    )

    const unauthFilesNotSaved = unauthFilesList.filter(
      (file) => !authFilesWithoutHello.find((authFile) => authFile.body === file.body)
    )

    if (!unauthFilesNotSaved.length) return

    // Збереження прогресу гостя
    saveProgressOfGuest()

    // Синхронізація файлів
    const syncFiles = async () => {
      const syncPromises = unauthFilesNotSaved.map(async (file) => {
        const existingFile = authFiles.find(
          (af) => af.name === file.name && af.extension === file.extension
        )

        try {
          if (existingFile) {
            await updateStudentFile({ ...existingFile, body: file.body }).unwrap()
          } else {
            await createStudentFile({
              ...file,
              lessonContentId: config.slideId,
              lessonId: config.lessonId,
            }).unwrap()
          }

          unauthFileLocalStorageManger(localStorageKey).removeFile(file.id)
        } catch (error) {
          console.error(`Failed to sync file ${file.name}:`, error)
        }
      })

      await Promise.allSettled(syncPromises)

      // Видалення hello файлів
      if (unauthFilesNotSaved.length + authFilesWithoutHello.length > 0) {
        const deletePromises = authFilesWithHello.map((file) =>
          deleteStudentFile(file)
            .unwrap()
            .catch((error) => console.error(`Failed to delete hello file ${file.name}:`, error))
        )
        await Promise.allSettled(deletePromises)
      }
    }

    syncFiles()
  }, [
    authFiles,
    unauthFilesList,
    config.isAuthenticated,
    config.slideId,
    config.lessonId,
    isPageReady,
    localStorageKey,
    saveProgressOfGuest,
    updateStudentFile,
    createStudentFile,
    deleteStudentFile,
  ])
}
