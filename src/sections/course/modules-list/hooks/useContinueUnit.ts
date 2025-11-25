import { useRouter } from 'next/router'

import { useGetLastLessonByModuleQuery } from '@/redux/services/manager/progress-student'

export const useContinueUnit = (unitId: string, studentId: string) => {
  const router = useRouter()

  const { data, refetch, isLoading } = useGetLastLessonByModuleQuery({
    moduleId: unitId,
    studentId,
  })

  const continueUnit = async () => {
    const result = await refetch()

    if (!result.data) return

    router.push(
      `/student/code-panel?courseId=${result.data.courseId}&unitId=${unitId}&lessonId=${result.data.lessonId}`
    )
  }

  return { continueUnit, isLoading }
}
