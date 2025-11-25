import { useRouter } from 'next/router'

import { useGetLastLessonByCourseQuery } from '@/redux/services/manager/progress-student'

export const useContinueCourse = (courseId: string, studentId: string) => {
  const router = useRouter()

  const { data, refetch, isLoading } = useGetLastLessonByCourseQuery({ courseId, studentId })

  const continueCourse = async () => {
    const result = await refetch()

    if (!result.data) return

    router.push(
      `/student/code-panel?courseId=${courseId}&unitId=${result.data.unitId}&lessonId=${result.data.lessonId}`
    )
  }

  return { continueCourse, isLoading }
}
