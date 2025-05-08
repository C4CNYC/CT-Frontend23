import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useAuthContext } from '@root/src/auth/useAuthContext'
import { LoadingScreen } from '@root/src/components/loading-screen/LoadingScreen'
import { ILesson } from '@root/src/redux/services/interfaces/courseUnits.interface'
import { useGetLessonsQuery } from '@root/src/redux/services/manager/lessons-manager'
import { useGetPublicLessonBySlugQuery } from '@root/src/redux/services/public-student'
import { BaseResponseInterface } from '@root/src/utils'
import { isUuid } from '@root/src/utils/isUuid'

import Page404 from '../404'

export default function Lesson() {
  const { isInitialized, isAuthenticated, user } = useAuthContext()
  const { query, push, isReady } = useRouter()
  const [notFound, notFoundSet] = useState(false)

  let slug = query.lesson ?? 'c1p0t0'
  slug = Array.isArray(slug) ? slug[0] : slug
  let { data: lessons, isLoading } = useGetLessonsQuery(
    { slug },
    { skip: !isReady || !isInitialized || !isAuthenticated }
  )
  let { data: lessonsPublic, isLoading: isLoadingPublic } = useGetPublicLessonBySlugQuery(
    { slug },
    { skip: !isReady || !isInitialized || isAuthenticated || isUuid(slug) }
  )
  useEffect(() => {
    if (!isReady || isLoading || isLoadingPublic) return
    let lesson: (ILesson & BaseResponseInterface) | undefined
    if (isAuthenticated) {
      if (lessons?.data?.length) {
        lesson = lessons.data[0]
      }
    } else {
      if (lessonsPublic?.data?.length) lesson = lessonsPublic.data[0]
    }
    if (lesson) {
      push(`/student/code-panel?&lessonId=${lesson.id}`)
    } else {
      notFoundSet(true)
    }
  }, [isReady, isLoading, isLoadingPublic, isAuthenticated])

  return notFound ? <Page404 /> : <LoadingScreen />
}
