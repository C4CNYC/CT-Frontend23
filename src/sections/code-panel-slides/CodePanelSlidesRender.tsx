import { useIndex } from '@root/src/hooks/useIndex'
import { useSelector } from '@root/src/redux/store'

import Navigation from '../code-panel/components/body/blocks/slider-block/navigation'

import { BrowserViewTeacher } from './BrowserTeacher'
import { useLessonManager } from './LessonManagerContext'

export function CodePanelSlidesRender() {
  const { courseId, unitId, lessonId, slideId, slideIndex } = useSelector(
    (state) => state.codePanelGlobal
  )
  const { lesson, lessonContent } = useLessonManager()
  const { currentIndex, handlePrev, handleNext, lastSlide } = useIndex(
    0,
    lessonContent?.length || 0
  )
  const currentSlide = lessonContent ? lessonContent[currentIndex] : null

  const stepHasValidation = !!lessonContent?.[currentIndex]?.validations?.length

  if (!lesson || !lessonContent) return <>loading...</>
  return (
    <>
      <BrowserViewTeacher
        key={currentIndex}
        stepBgColor={currentSlide?.bg_color}
        document={connectIntegrations(currentSlide?.body, lesson?.integrations)}
        iframeKey={0}
      />

      <Navigation
        hasPrev={currentIndex > 0}
        onNext={handleNext}
        onPrev={handlePrev}
        stepHasValidation={stepHasValidation}
        canMoveNext={!lastSlide || !stepHasValidation}
        hasNextStep={!lastSlide}
        lessonName={lesson?.name}
      />
    </>
  )
}

function connectIntegrations(body?: string, integrations?: { scripts: string; head: string }[]) {
  if (!body) return { htmlBody: '', mdBody: '', cssBody: '', jsBody: '' }

  try {
    const parsed = JSON.parse(body)
    const isMd = parsed.extension === 'md'

    return {
      htmlBody: isMd ? '' : parsed.content,
      mdBody: isMd ? parsed.content : '',
      cssBody: integrations?.reduce((acc, cur) => acc + cur.head, '') || '',
      jsBody: integrations?.reduce((acc, cur) => acc + cur.scripts, '') || '',
    }
  } catch {
    return { htmlBody: '', mdBody: '', cssBody: '', jsBody: '' }
  }
}
