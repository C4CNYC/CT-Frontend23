import { BrowserViewTeacherBare } from './BrowserTeacherBare'
import { useLessonManager } from './LessonManagerContext'

export function CodePanelSlidesRender() {
  const { lessonContent } = useLessonManager()
  const currentSlide = lessonContent ? lessonContent[0] : null
  if (!lessonContent || !currentSlide) return <>loading...</>
  return <BrowserViewTeacherBare slide={currentSlide} />
}
