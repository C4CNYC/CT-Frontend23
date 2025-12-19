import { useSelector } from '@/redux/store'

import SkeletonViewBlock from '../code-panel/components/body/blocks/view-block/skeleton-view-box'

import { CheckersCompleated } from './CheckersCompleated'
import { useFileReadiness } from './hooks/useFileReadiness'
import { useLessonManager } from './LessonManagerContext'
import { useLessonLoader } from './ServiceWorkerLoader'
import { useCheckers } from './useCheckers'

export function BrowserViewTeacherBare() {
  const { lesson, lessonContent, checkersAnimation } = useLessonManager()
  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
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
        src={`/student/code-panel/iframe?slideId=${currentSlide.id}&lessonId=${lesson.id}`}
        style={{ border: 0, width: '100%', height: '100%', overflow: 'hidden' }}
      />
    </div>
  )
}
