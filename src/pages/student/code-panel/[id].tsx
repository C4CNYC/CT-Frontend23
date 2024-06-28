import { ReactElement, useEffect } from 'react'

import { useRouter } from 'next/router'

import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'

export default function CodePanelPage(): ReactElement | null {
  const router = useRouter()
  useEffect(() => {
    if (!router.query.id) return
    void router.push(
      STUDENT_PATH_DASHBOARD.codeStream.initWorkSpace({
        courseId: router.query.id as string,
        unitId: router.query.unitId as string,
        lessonId: router.query.lessonId as string,
      })
    )
  }, [router.query.id, router.query.unitId, router.query.lessonId])

  return null
}
