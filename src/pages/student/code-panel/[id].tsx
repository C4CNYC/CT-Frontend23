import { ReactElement, useEffect } from 'react'

import { useRouter } from 'next/router'

import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'

export default function CodePanelPage(): ReactElement | null {
  const router = useRouter()
  useEffect(() => {
    void router.push(
      STUDENT_PATH_DASHBOARD.codePanel.workSpace({
        courseId: router.query.id as string,
        unitId: router.query.unitId as string,
        lessonId: router.query.lessonId as string,
      })
    )
  }, [])

  return null
}
