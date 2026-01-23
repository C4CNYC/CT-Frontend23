import React, { useEffect, useMemo, useState } from 'react'

import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'

import { LoadingScreen } from '@/components'
import { IIntegration } from '@/redux/interfaces/integration.interface'
import {
  setNextStepAble,
  setSlideId,
  setSlideIndex,
  setSolutionCode,
} from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useDebounceCallback } from '@root/src/hooks'
import {
  useGetStudentLastVisitedSlideQuery,
  useUpdateStudentLastVisitedSlideMutation,
} from '@root/src/redux/services/manager/lesson-student'
import { progressGuestGetAll, progressGuestSet } from '@root/src/utils/progressLocalStorage'

import Navigation from '../code-panel/components/body/blocks/slider-block/navigation'
import { CodeDocument } from '../code-panel/components/body/blocks/view-block/browser-view/types'

import { BrowserViewTeacher } from './BrowserTeacher'
import { useLessonManager } from './LessonManagerContext'
import { TopPanel } from './TopPanel'
import { useCheckers } from './useCheckers'

interface CodePanelSlidesRenderProps {
  onSubmitLesson?: () => void
  onSubmitChallenge?: (slideId: string, code?: string) => void
  integrations?: Array<IIntegration & BaseResponseInterface>
  lessonType?: string
  lessonName?: string
  lessonId?: string
  isLoadingLessonContent?: boolean
  lessonMeta?: Record<string, any>
}

export function CodePanelSlidesRender({
  onSubmitLesson = () => {},
  onSubmitChallenge = () => {},
  lessonType,
  lessonName,
  lessonId,
  isLoadingLessonContent = false,
  lessonMeta,
}: CodePanelSlidesRenderProps) {
  const dispatch = useDispatch()
  const { lesson, lessonContent, currentSlideUpdated } = useLessonManager()
  useCheckers()
  let data = lessonContent ?? []
  let integrations = lesson?.integrations
  const [isSlideReady, setIsSlideReady] = useState(false)

  const profile = useSelector((state) => state.global.user)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const slideId = useSelector((state) => state.codePanelGlobal.slideId)

  const [updateLastVisitedSlide] = useUpdateStudentLastVisitedSlideMutation()
  const { data: lastSlide, isLoading: isLastSlideLoading } = useGetStudentLastVisitedSlideQuery(
    {
      id: lessonId as string,
    },
    { skip: !lessonId || !profile }
  )

  const handleDebouncedCallback = useDebounceCallback(1000)

  const hasNextStep = slideIndex < data?.length - 1
  const stepHasValidation = !!data[slideIndex]?.validations?.length

  const handlePrev = (): void => {
    if (currentSlideUpdated) {
      // Handle slide edited state - similar to working implementation
      return
    }

    if (slideIndex > 0) {
      onBeforeChange(slideIndex, slideIndex - 1)
    }
  }

  useEffect(() => {
    setIsSlideReady(false)
    const timeout = setTimeout(() => {
      setIsSlideReady(true)
    }, 30)

    return () => clearTimeout(timeout)
  }, [slideIndex, setIsSlideReady])

  const handleNext = (skip = false): void => {
    if (currentSlideUpdated) {
      // Handle slide edited state - similar to working implementation
      return
    }

    if (stepHasValidation && !skip) {
      const slideId = data[slideIndex]?.id
      if (slideId) onSubmitChallenge(slideId, '')
    }
    if (hasNextStep) {
      onBeforeChange(slideIndex, slideIndex + 1)
    } else {
      onSubmitLesson()
    }
  }

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

  const onBeforeChange = (current: number, next: number) => {
    if (!data || !data?.length || !data[next]) return
    let slideNextId = data[next]?.id
    if (slideId == slideNextId) return

    dispatch(setSolutionCode(data[slideIndex]?.solution_body ?? ''))
    dispatch(setSlideIndex(next))
    if (slideNextId) dispatch(setSlideId(slideNextId))
  }

  const connectIntegrations = (body: string): CodeDocument => {
    if (integrations) {
      return {
        htmlBody: body && JSON.parse(body).extension !== 'md' ? JSON.parse(body).content : '',
        mdBody: body && JSON.parse(body).extension === 'md' ? JSON.parse(body).content : '',
        cssBody: integrations.reduce((ac, cur) => ac + cur.head, ''),
        jsBody: integrations.reduce((ac, cur) => ac + cur.scripts, ''),
      }
    }
    return { htmlBody: body ? JSON.parse(body).content : '', cssBody: '', jsBody: '' }
  }

  useEffect(() => {
    if (!data || data.length < 1) return
    if (isLastSlideLoading) return
    if (lastSlide?.slideNumber) {
      onBeforeChange(slideIndex, lastSlide.slideNumber)
    } else {
      let progress = progressGuestGetAll(lessonId as string)
      if (progress) {
        onBeforeChange(slideIndex, progress.lastSlide)
      }
    }
  }, [lastSlide, data.length])

  useEffect(() => {
    dispatch(setNextStepAble(false))
    handleDebouncedCallback(() => {
      if (slideIndex >= 0) onUpdateLastSlide(slideIndex)
    })
  }, [slideIndex])

  const slider = useMemo(() => {
    const currentSlide = data[slideIndex]
    return (
      <Box
        className='sliderTour'
        height='100%'
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isLoadingLessonContent || !isSlideReady ? (
          <LoadingScreen text='Lesson is loading' />
        ) : currentSlide ? (
          <BrowserViewTeacher
            key={currentSlide?.id}
            stepBgColor={currentSlide?.bg_color}
            document={connectIntegrations(currentSlide?.body)}
            iframeKey={0}
          />
        ) : lesson?.meta?.ai ? (
          <div>AI Lesson Coming Soon</div>
        ) : (
          <LoadingScreen text='Slide not found' />
        )}
      </Box>
    )
  }, [data, slideIndex, lesson, isLoadingLessonContent, isSlideReady])

  if (!lesson || !lessonContent) return <LoadingScreen text='Loading lesson...' />

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
      }}
    >
      <TopPanel language={'html'} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{slider}</Box>
      {!lessonMeta?.hideDefaultButtons && (
        <Navigation
          hasPrev={slideIndex > 0}
          onNext={handleNext}
          onPrev={handlePrev}
          stepHasValidation={stepHasValidation}
          canMoveNext={!stepHasValidation}
          hasNextStep={hasNextStep}
          lessonName={lessonName}
        />
      )}
    </Box>
  )
}
