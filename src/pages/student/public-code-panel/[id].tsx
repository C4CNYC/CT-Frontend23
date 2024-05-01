import { ReactElement, useEffect } from 'react'

import { useRouter } from 'next/router'

import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useGetPublicCourseQuery } from '@root/src/redux/services/public-student'

export default function PublicCodePanelPage(): ReactElement | null {
  const router = useRouter()

  const { data, isLoading } = useGetPublicCourseQuery({})

  useEffect(() => {
    if (!router.query.id) return
    // void router.push(
    //   `${STUDENT_PATH_DASHBOARD.publicCodePanel.workSpace({ courseId: 'c3bcc979-62f8-4af4-acca-692a789c19ee', unitId: '3647411b-cdba-4cd1-bb43-0aa4af917de2', lessonId: 'e95619fe-ae34-40f5-9672-02b5866f68b9' })}`
    // )
    void router.push(
      STUDENT_PATH_DASHBOARD.publicCodePanel.workSpace({
        courseId: router.query.id as string,
        unitId: router.query.unitId as string,
        lessonId: router.query.lessonId as string,
      })
    )
  }, [router.query.id, router.query.unitId, router.query.lessonId])

  return null
}
