import Iframe from '@root/src/pages/student/code-panel/iframe'
import { ILessonContent } from '@root/src/redux/interfaces/content.interface'

import SkeletonViewBlock from '../code-panel/components/body/blocks/view-block/skeleton-view-box'

import { useLessonManager } from './LessonManagerContext'
import { useLessonLoader } from './ServiceWorkerLoader'

export function BrowserViewTeacherBare2({ slide }: { slide: ILessonContent }) {
  return <Iframe />
}
export function BrowserViewTeacherBare({ slide }: { slide: ILessonContent }) {
  const { lesson } = useLessonManager()
  useLessonLoader()
  if (!lesson || !slide.body) return <SkeletonViewBlock isOpenHeader={true} />
  return (
    <iframe
      className='BrowserViewTeacherView'
      id='lessonFrame'
      src={`/student/code-panel/iframe?slideId=${slide.id}&lessonId=${lesson.id}`}
      style={{ border: 0, width: '100vw', height: '100vh' }}
    />
  )
}
