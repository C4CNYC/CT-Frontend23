import { useRouter } from 'next/router'

import { LoadingScreen } from '@root/src/components/loading-screen/LoadingScreen'
import { useGetLessonsQuery } from '@root/src/redux/services/manager/lessons-manager'

import Page404 from '../404'

export default function Lesson() {
  const { query, push } = useRouter()
  let slug = query.lesson ?? 'c1p0t0'
  let { data: lessons, isLoading } = useGetLessonsQuery({
    slug: Array.isArray(slug) ? slug[0] : slug,
  })
  if (!isLoading) {
    if (lessons?.data.length) {
      let l = lessons.data[0]
      push(`/student/code-panel?&lessonId=${l.id}`)
    } else {
      return <Page404 />
    }
  }
  return <LoadingScreen />
}
