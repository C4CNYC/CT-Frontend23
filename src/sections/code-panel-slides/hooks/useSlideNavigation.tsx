import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import {
  setNextStepAble,
  setSlideId,
  setSlideIndex,
  setSolutionCode,
} from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import { useDebounceCallback } from '@root/src/hooks'

import { useLessonManager } from '../LessonManagerContext'

interface UseSlideNavigationProps {
  onSubmitChallenge: (slideId: string, code?: string) => void
  onSubmitLesson: () => void
  onUpdateLastSlide: (slideIndex: number) => void
}

interface UseSlideNavigationReturn {
  handlePrev: () => void
  handleNext: (skip?: boolean) => void
  onBeforeChange: (current: number, next: number) => void
  hasNextStep: boolean
  stepHasValidation: boolean
  slideIndex: number
  slideId: string
}

export function useSlideNavigation({
  onSubmitChallenge,
  onSubmitLesson,
  onUpdateLastSlide,
}: UseSlideNavigationProps): UseSlideNavigationReturn {
  const handleDebouncedCallback = useDebounceCallback(1000)
  const { lesson, lessonContent = [], currentSlideUpdated } = useLessonManager()
  const profile = useSelector((state) => state.global.user)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const slideId = useSelector((state) => state.codePanelGlobal.slideId)
  const dispatch = useDispatch()

  const hasNextStep = slideIndex < lessonContent.length - 1
  const stepHasValidation = !!lessonContent[slideIndex]?.validations?.length

  const handlePrev = (): void => {
    if (currentSlideUpdated) {
      return
    }

    if (slideIndex > 0) {
      onBeforeChange(slideIndex, slideIndex - 1)
    }
  }

  const handleNext = (skip = false): void => {
    if (currentSlideUpdated) {
      return
    }

    if (stepHasValidation && !skip) {
      const currentSlideId = lessonContent[slideIndex]?.id
      if (currentSlideId) onSubmitChallenge(currentSlideId, '')
    }
    if (hasNextStep) {
      onBeforeChange(slideIndex, slideIndex + 1)
    } else {
      onSubmitLesson()
    }
  }

  const onBeforeChange = (current: number, next: number): void => {
    if (!lessonContent.length || !lessonContent[next]) return
    let slideNextId = lessonContent[next]?.id
    if (slideId == slideNextId) return

    dispatch(setSolutionCode(lessonContent[slideIndex]?.solution_body ?? ''))
    dispatch(setSlideIndex(next))
    if (slideNextId) dispatch(setSlideId(slideNextId))
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type } = event.data
      if (type === 'nextSlide') {
        handleNext(event.data.skip)
      } else if (type === 'prevSlide') {
        handlePrev()
      } else if (type === 'goToSlide') {
        const targetIndex = event.data.slideIndex
        if (
          typeof targetIndex === 'number' &&
          targetIndex >= 0 &&
          targetIndex < lessonContent.length
        ) {
          onBeforeChange(slideIndex, targetIndex)
        }
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [handleNext, handlePrev, onBeforeChange, slideIndex, lessonContent.length])

  useEffect(() => {
    dispatch(setNextStepAble(false))
    handleDebouncedCallback(() => {
      if (slideIndex >= 0) onUpdateLastSlide(slideIndex)
    })
  }, [slideIndex, handleDebouncedCallback, onUpdateLastSlide])

  return {
    handlePrev,
    handleNext,
    onBeforeChange,
    hasNextStep,
    stepHasValidation,
    slideIndex,
    slideId,
  }
}
