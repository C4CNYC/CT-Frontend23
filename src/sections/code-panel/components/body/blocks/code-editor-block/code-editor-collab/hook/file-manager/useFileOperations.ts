import { useCallback } from 'react'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import {
  useCreateStudentFileMutation,
  useDeleteStudentFileMutation,
  useUpdateStudentFileMutation,
} from '@root/src/redux/services/manager/workspace-student'

import { unauthFileLocalStorageManger } from './filesLocalstorageManager'
import { tabsLocalStorageManger } from './tabsLocalstorageManager'
import { FileManagerConfig } from './useFileManager_new'

// 5. Hook для CRUD операцій
export const useFileOperations = (
  config: FileManagerConfig,
  localStorageKey: string,
  tabsStorageKey: string
) => {
  const [createStudentFile] = useCreateStudentFileMutation()
  const [deleteStudentFile] = useDeleteStudentFileMutation()
  const [updateStudentFile] = useUpdateStudentFileMutation()

  const createFile = useCallback(
    async (fileName: string): Promise<StudentFile | null> => {
      if (!config.lessonId || !config.slideId) {
        throw new Error('Missing lessonId or slideId')
      }

      const [name, extension] = fileName.split('.')
      const fileData = {
        name,
        extension,
        body: '',
        lessonContentId: config.slideId,
      }

      try {
        if (!config.isAuthenticated) {
          return unauthFileLocalStorageManger(localStorageKey).addFile(
            {
              id: `${name}-${extension}-${Date.now()}`,
              ...fileData,
            },
            'ignoreThisVersion'
          )
        }

        const result = await createStudentFile({
          ...fileData,
          lessonId: config.lessonId,
        }).unwrap()

        return result
      } catch (error) {
        console.error('Failed to create file:', error)
        throw error
      }
    },
    [config, localStorageKey, createStudentFile]
  )

  const updateFile = useCallback(
    async (id: string, updates: Partial<Omit<StudentFile, 'lessonId' | 'id'>>): Promise<void> => {
      const filteredUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined)
      )

      try {
        if (!config.isAuthenticated) {
          unauthFileLocalStorageManger(localStorageKey).updateFile(id, filteredUpdates)
          return
        }

        await updateStudentFile({ id, ...filteredUpdates }).unwrap()
      } catch (error) {
        console.error('Failed to update file:', error)
        throw error
      }
    },
    [config.isAuthenticated, localStorageKey, updateStudentFile]
  )

  const deleteFile = useCallback(
    async (id: string): Promise<void> => {
      try {
        if (!config.isAuthenticated) {
          unauthFileLocalStorageManger(localStorageKey).removeFile(id)
        } else {
          await deleteStudentFile({ id }).unwrap()
        }

        tabsLocalStorageManger(tabsStorageKey).removeTab(id)
      } catch (error) {
        console.error('Failed to delete file:', error)
        throw error
      }
    },
    [config.isAuthenticated, localStorageKey, tabsStorageKey, deleteStudentFile]
  )

  return { createFile, updateFile, deleteFile }
}
