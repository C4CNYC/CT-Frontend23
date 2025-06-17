import { useMemo } from 'react'

import { useRouter } from 'next/router'

import {
  useGetLessonContentStudentQuery,
  useGetLessonStudentWithoutContentsQuery,
} from '@root/src/redux/services/manager/lesson-student'
import {
  useGetFilesByUnauthUserQuery,
  useGetStudentFilesQuery,
} from '@root/src/redux/services/manager/workspace-student'

import { FileManagerConfig } from './useFileManager_new'

// 2. Hook для завантаження даних
export const useFileData = (config: FileManagerConfig) => {
  const { query } = useRouter()

  const { data: lesson, isLoading: isLessonLoading } = useGetLessonStudentWithoutContentsQuery(
    { id: config.lessonId! },
    { skip: !config.lessonId }
  )

  const { data: lessonContent } = useGetLessonContentStudentQuery(
    { id: query.lessonId as string },
    { skip: !query.lessonId }
  )

  const {
    refetch: refetchAuthFiles,
    isLoading: isAuthLoading,
    isFetching: isAuthFetching,
    data: authFiles = [],
  } = useGetStudentFilesQuery(
    { lessonId: config.lessonId!, lessonContentId: config.slideId || '' },
    { skip: !config.lessonId || !config.slideId || !config.isAuthenticated }
  )

  const {
    data: unauthFiles = [],
    isLoading: isUnauthLoading,
    isFetching: isUnauthFetching,
  } = useGetFilesByUnauthUserQuery(
    { lessonId: config.lessonId!, lessonContentId: config.slideId || '' },
    { skip: !config.lessonId || !config.slideId || config.isAuthenticated }
  )

  const isPageReady = useMemo(
    () => !isLessonLoading && !isUnauthLoading && !isAuthLoading && !isAuthFetching,
    [isLessonLoading, isUnauthLoading, isAuthLoading, isAuthFetching]
  )

  return {
    lesson,
    lessonContent,
    authFiles,
    unauthFiles,
    isPageReady,
    isLoading: isAuthLoading || isUnauthLoading,
    isFetching: isAuthFetching || isUnauthFetching,
    refetchAuthFiles,
  }
}
