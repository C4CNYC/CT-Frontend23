import { useEffect } from 'react'

import { useRouter } from 'next/router'

import {
  setCourseId,
  setLessonId,
  setSlideId,
  setSlideIndex,
  setUnitId,
} from '@/redux/slices/code-panel-global'
import {
  useGetLessonContentStudentQuery,
  useGetLessonStudentWithoutContentsQuery,
} from '@root/src/redux/services/manager/lesson-student'
import { useDispatch } from '@root/src/redux/store'
import { route2Number, route2String } from '@root/src/utils/route2String'

import { CodePanelSlidesRender } from './CodePanelSlidesRender copy'
import { LessonManagerProvider } from './LessonManagerContext'

export function CodePanelSlides({ lessonId }: { lessonId: string }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data: lesson } = useGetLessonStudentWithoutContentsQuery(
    { id: lessonId },
    { skip: !lessonId }
  )
  const { data: lessonContent, isLoading: isLoadingLessonContent } =
    useGetLessonContentStudentQuery({ id: lessonId }, { skip: !lessonId })
  useEffect(() => {
    dispatch(setLessonId(lessonId))
    dispatch(setUnitId(route2String(router.query.unitId)))
    dispatch(setCourseId(route2String(router.query.courseId)))
    dispatch(setSlideId(route2String(router.query.slideId)))
    dispatch(setSlideIndex(route2Number(router.query.slideIndex)))
  }, [dispatch, lessonId, router.query])
  if (!lesson || !lessonContent) return <>loading</>

  return (
    <LessonManagerProvider
      isLoading={isLoadingLessonContent || !lessonId}
      lesson={lesson}
      lessonContent={lessonContent}
    >
      <CodePanelSlidesRender />
    </LessonManagerProvider>
  )
}
