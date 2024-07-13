import { ReactElement, useEffect } from 'react'

import { useRouter } from 'next/router'

import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useSelector } from '@root/src/redux/store'

export default function CodePanelPage(): ReactElement | null {
  const router = useRouter()

  const user = useSelector((state) => state.global.user)

  useEffect(() => {
    if (!user) {
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_CODE_STREAM_API}/stream_room`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owner_id: user?.id,
        course_id: router.query.courseId,
        unit_id: router.query.unitId,
        lesson_id: router.query.lessonId,
        code: '',
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Failed to create stream room')
      })
      .then((data) => {
        void router.push(STUDENT_PATH_DASHBOARD.codeStream.workSpace(data._id))
      })
  }, [router.query, user])

  return null
}
