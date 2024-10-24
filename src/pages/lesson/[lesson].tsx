import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { LoadingScreen } from '@root/src/components/loading-screen/LoadingScreen'
import { useGetLessonsQuery } from '@root/src/redux/services/manager/lessons-manager'

import Page404 from '../404'

export default function Lesson() {
  const { query, push, isReady } = useRouter()
  const [notFound, notFoundSet] = useState(false)

  let slug = query.lesson ?? 'c1p0t0'
  let { data: lessons, isLoading } = useGetLessonsQuery(
    {
      slug: Array.isArray(slug) ? slug[0] : slug,
    },
    { skip: !isReady }
  )
  useEffect(() => {
    if (!isReady || isLoading) return
    if (lessons?.data.length) {
      let l = lessons.data[0]

      push(`/student/code-panel?&lessonId=${l.id}`)
    } else {
      notFoundSet(true)
    }
  }, [isReady, isLoading])

  return notFound ? <Page404 /> : <LoadingScreen />
}
