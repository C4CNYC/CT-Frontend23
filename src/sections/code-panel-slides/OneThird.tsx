import { useEffect } from 'react'

import { useRouter } from 'next/router'

import {
  setCourseId,
  setLessonId,
  setSlideId,
  setSlideIndex,
  setUnitId,
} from '@/redux/slices/code-panel-global'
import SkeletonCodePanel from '@/sections/code-panel/components/skeleton'
import {
  useGetLessonContentStudentQuery,
  useGetLessonStudentWithoutContentsQuery,
} from '@root/src/redux/services/manager/lesson-student'
import { useDispatch } from '@root/src/redux/store'
import { route2Number, route2String } from '@root/src/utils/route2String'

import { FullScreenProvider } from '../code-panel/lib/FullScreenContext'

import { BrowserViewTeacherBare } from './BrowserTeacherBare'
import { CodePanelSlidesRender } from './CodePanelSlidesRender copy'
import { LessonManagerProvider } from './LessonManagerContext'

export function OneThird({ lessonId }: { lessonId: string }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data: lesson } = useGetLessonStudentWithoutContentsQuery(
    { id: lessonId },
    { skip: !lessonId }
  )
  const { data: lessonContent, isLoading: isLoadingLessonContent } =
    useGetLessonContentStudentQuery({ id: lessonId }, { skip: !lessonId })
  useEffect(() => {
    if (!lesson || !lessonContent || !lessonContent.length) return
    dispatch(setLessonId(lessonId))
    dispatch(setUnitId(route2String(router.query.unitId)))
    dispatch(setCourseId(route2String(router.query.courseId)))

    let slideId = route2String(router.query.slideId)
    if (!slideId) {
      slideId = lessonContent[0].id
    }

    dispatch(setSlideId(slideId))
    dispatch(setSlideIndex(route2Number(router.query.slideIndex)))
  }, [dispatch, lessonId, router.query, lessonContent])
  if (!lesson || !lessonContent) return <SkeletonCodePanel />

  return (
    <LessonManagerProvider
      isLoading={isLoadingLessonContent || !lessonId}
      lesson={lesson}
      lessonContent={lessonContent}
    >
      <FullScreenProvider>
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
          <div
            style={{
              flex: '0 0 33.333%',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <CodePanelSlidesRender />
          </div>
          <div style={{ flex: '0 0 66.667%', overflow: 'hidden' }}>
            <BrowserViewTeacherBare />
          </div>
        </div>
      </FullScreenProvider>
    </LessonManagerProvider>
  )
}
