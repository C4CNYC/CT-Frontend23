import { useMemo } from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useAuthContext } from '@root/src/auth/useAuthContext'
import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'
import { useGetLessonStudentWithoutContentsQuery } from '@root/src/redux/services/manager/lesson-student'
import { useSelector } from '@root/src/redux/store'

import { getLocalStorageRoomKey } from '../utils/getLocalStorage'

import { FileManagerConfig } from './useFileManager_new'

// 1. Hook для конфігурації та ключів localStorage
export const useFileManagerConfig = (): {
  config: FileManagerConfig
  localStorageKey: string
  tabsStorageKey: string
} => {
  const { query } = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuthContext()

  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId) || String(query?.lessonId)

  const { data: lesson } = useGetLessonStudentWithoutContentsQuery(
    { id: lessonId! },
    { skip: !lessonId }
  )

  const sandbox = searchParams.get('sandbox')
  const isAuthenticated = !!user

  const { localStorageKey, tabsStorageKey } = useMemo(() => {
    let key: string

    switch (lesson?.type) {
      case LessonType.EXERCISE:
        key = getLocalStorageRoomKey(`${lessonId}_${slideId}`)
        break
      case LessonType.PRACTICAL:
      default:
        key = getLocalStorageRoomKey(`${lessonId}`)
        break
    }

    if (sandbox) {
      key += `_sandbox`
    }

    return {
      localStorageKey: key,
      tabsStorageKey: `${key}_tabs`,
    }
  }, [lessonId, slideId, lesson?.type, sandbox])

  return {
    config: {
      lessonId,
      slideId,
      isAuthenticated,
      lessonType: lesson?.type,
      sandbox: !!sandbox,
    },
    localStorageKey,
    tabsStorageKey,
  }
}
