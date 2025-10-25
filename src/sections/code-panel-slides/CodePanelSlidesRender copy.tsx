import { useIndex } from '@root/src/hooks/useIndex'

import Navigation from '../code-panel/components/body/blocks/slider-block/navigation'

import { BrowserViewTeacher } from './BrowserTeacher'
import { useLessonManager } from './LessonManagerContext'

export function CodePanelSlidesRender() {
  const { lesson, lessonContent } = useLessonManager()
  const { currentIndex, handlePrev, handleNext, lastSlide } = useIndex(
    0,
    lessonContent?.length || 0
  )
  const currentSlide = lessonContent ? lessonContent[currentIndex] : null

  const stepHasValidation = !!lessonContent?.[currentIndex]?.validations?.length

  if (!lesson || !lessonContent || !currentSlide) return <>loading...</>
  return (
    <>
      <BrowserViewTeacher slide={currentSlide} />
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
