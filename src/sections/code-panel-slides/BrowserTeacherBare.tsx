import { useSelector } from '@/redux/store'
import {
  useGetStudentLastVisitedSlideQuery,
  useUpdateStudentLastVisitedSlideMutation,
} from '@root/src/redux/services/manager/lesson-student'
import { progressGuestGetAll, progressGuestSet } from '@root/src/utils/progressLocalStorage'

import SkeletonViewBlock from '../code-panel/components/body/blocks/view-block/skeleton-view-box'

import { CheckersCompleated } from './CheckersCompleated'
import { useFileReadiness } from './hooks/useFileReadiness'
import { useSlideNavigation } from './hooks/useSlideNavigation'
import { useLessonManager } from './LessonManagerContext'
import { useLessonLoader } from './ServiceWorkerLoader'
import { useCheckers } from './useCheckers'

interface BrowserViewTeacherBareProps {
  onSubmitLesson?: () => void
  onSubmitChallenge?: (slideId: string, code?: string) => void
  lessonId?: string
}

export function BrowserViewTeacherBare({
  onSubmitLesson = () => {},
  onSubmitChallenge = () => {},
  lessonId,
}: BrowserViewTeacherBareProps) {
  const { lesson, lessonContent, checkersAnimation } = useLessonManager()
  const profile = useSelector((state) => state.global.user)

  const [updateLastVisitedSlide] = useUpdateStudentLastVisitedSlideMutation()
  const { isLoading: isLastSlideLoading } = useGetStudentLastVisitedSlideQuery(
    { id: lessonId as string },
    { skip: !lessonId || !profile }
  )

  const onUpdateLastSlide = (next: number) => {
    if (isLastSlideLoading) return
    if (profile) {
      updateLastVisitedSlide({ lessonId: lessonId as string, slideNumber: next })
    }
    if (localStorage) {
      if (lessonId) {
        const progress = progressGuestGetAll(lessonId)
        progress.lastSlide = next
        progressGuestSet(lessonId, progress)
      }
    }
  }

  const { slideId } = useSlideNavigation({
    onSubmitChallenge,
    onSubmitLesson,
    onUpdateLastSlide,
  })

  const currentSlide = lessonContent
    ? lessonContent.find((slide) => slide.id === slideId) || lessonContent[0]
    : null

  useFileReadiness({})
  useCheckers()
  useLessonLoader()

  if (!lesson || !currentSlide || !currentSlide.body)
    return <SkeletonViewBlock isOpenHeader={true} />
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {checkersAnimation.value && <CheckersCompleated />}
      <iframe
        className='BrowserViewTeacherView'
        id='lessonFrame'
        src={`/student/code-panel/iframe?slideId=${slideId}&lessonId=${lessonId}`}
        style={{ border: 0, width: '100%', height: '100%', overflow: 'hidden' }}
      />
    </div>
  )
}
