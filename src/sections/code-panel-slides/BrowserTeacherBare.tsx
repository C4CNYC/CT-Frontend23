import SkeletonViewBlock from '../code-panel/components/body/blocks/view-block/skeleton-view-box'

import { useLessonManager } from './LessonManagerContext'
import { useLessonLoader } from './ServiceWorkerLoader'
import { useCheckers } from './useCheckers'

export function BrowserViewTeacherBare() {
  const { lesson, lessonContent } = useLessonManager()
  const currentSlide = lessonContent ? lessonContent[0] : null
  useCheckers()
  useLessonLoader()
  if (!lesson || !currentSlide || !currentSlide.body)
    return <SkeletonViewBlock isOpenHeader={true} />
  return (
    <iframe
      className='BrowserViewTeacherView'
      id='lessonFrame'
      src={`/student/code-panel/iframe?slideId=${currentSlide.id}&lessonId=${lesson.id}`}
      style={{ border: 0, width: '100%', height: '100%', overflow: 'hidden' }}
    />
  )
}
