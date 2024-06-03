import { ReactElement, useEffect } from 'react'

import { useRouter } from 'next/router'

import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { setStudentPosition } from '@root/src/redux/slices/code-panel-global'
import { useDispatch, useSelector } from '@root/src/redux/store'

export default function CodePanelPage(): ReactElement | null {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.global.user)

  useEffect(() => {
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
        dispatch(
          setStudentPosition({
            courseId: data.course_id,
            unitId: data.unit_id,
            lessonId: data.lesson_id,
            slideIndex: data.slide_index,
          })
        )
        void router.push(STUDENT_PATH_DASHBOARD.codeStream.workSpace(data._id))
      })
  }, [router.query])

  return null
}
