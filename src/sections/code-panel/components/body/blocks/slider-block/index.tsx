import React, { type FC, useCallback, useEffect, useMemo, useState } from 'react'

import { Box, useTheme } from '@mui/material'
import { SlDirections } from '@react-icons/all-files/sl/SlDirections'
import { TbArrowBarToLeft } from '@react-icons/all-files/tb/TbArrowBarToLeft'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { LoadingScreen } from '@/components'
import useIsDesktop from '@/hooks/useIsDesktop'
import {
  setNextStepAble,
  setSlideId,
  setSlideIndex,
  setSolutionCode,
  toggleInstrations,
} from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'
import { useDebounceCallback } from '@root/src/hooks'
import { useBoolean } from '@root/src/hooks/use-boolean'
import {
  useGetStudentLastVisitedSlideQuery,
  useUpdateStudentLastVisitedSlideMutation,
} from '@root/src/redux/services/manager/lesson-student'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'
import { progressGuestGetAll, progressGuestSet } from '@root/src/utils/progressLocalStorage'

import { BrowserViewTeacher } from '../../../browserview/BrowserViewTeacher'
import BaseBlock from '../base-block'
import { CodeDocument } from '../view-block/browser-view/types'

import {
  ISliderBlock,
  NextStepProps,
  PROGRESS_ITEM_SX,
  getBoxSx,
  getProgressWrapperSx,
} from './constants'
import { EditContentLayer } from './edit-content-layer'
import Navigation from './navigation'
import { SliderBlockAiLessonComing } from './SliderBlockAiLessonComing'

const NextLessonDialog = dynamic(async () => await import('./next-lesson-dialog'))

export const icon = (
  <SlDirections
    size='20px'
    color='#43D4DD'
  />
)

const SliderBlock: FC<ISliderBlock> = ({
  onSubmitLesson,
  onSubmitChallenge,
  integrations,
  lessonType,
  lessonName,
  lessonId,
  isLoadingLessonContent,
  lessonMeta,
}) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()
  const translate = useTranslate()
  const searchParams = useSearchParams()
  const { lesson, lessonContent, currentSlideUpdated } = useLessonManager()
  let data = lessonContent ?? []
  const { value, onFalse, onTrue } = useBoolean()
  const [isEditLesson, setIsEditLesson] = useState(false)
  const [isSlideReady, setIsSlideReady] = useState(false)
  const [isOpenModalCurrentSlideEdited, setIsOpenModalCurrentSlideEdited] = useState(false)

  const sandbox = searchParams.get('sandbox')

  const profile = useSelector((state) => state.global.user)
  const unit = useSelector((state) => state.codePanelGlobal.unitId)
  const course = useSelector((state) => state.codePanelGlobal.courseId)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const slideId = useSelector((state) => state.codePanelGlobal.slideId)

  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(true)
  const [noteText, setNoteText] = useState(localStorage.getItem(`sandboxNotes${profile?.id}`) ?? '')

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
  const title = sandbox ? translate('Notes') : translate('instructions')
  const progressWrapperSx = useMemo(() => getProgressWrapperSx(theme), [theme])
  const boxSx = useMemo(() => getBoxSx(isDesktop, isOpenHeader), [isDesktop, isOpenHeader])

  const takeHeaderSettings = useCallback((isOpen: boolean) => {
    setIsOpenHeader(isOpen)
  }, [])

  const handlePrev = (): void => {
    if (currentSlideUpdated) {
      setIsOpenModalCurrentSlideEdited(true)
      return
    }
    setIsEditLesson(false)

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
      setIsOpenModalCurrentSlideEdited(true)
      return
    }
    setIsEditLesson(false)

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'Slide_Swiped',
        event_category: `Course ${course} > Unit ${unit} > Lesson ${lessonName}`,
        event_label: `SlideNumber ${slideIndex + 1}`,
        slideIndex: slideIndex + 1,
      })
    }
    if (stepHasValidation && !skip) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'Challenge_Completed',
          event_category: `Course ${course} > Unit (Module) ${unit} > Training (Lesson) ${lessonName}`,
          event_label: `SlideNumber ${slideIndex + 1}`,
          slideIndex: slideIndex + 1,
        })
      }
      const slideId = data[slideIndex]?.id
      if (slideId) onSubmitChallenge(slideId, '')
    }
    if (hasNextStep) {
      onBeforeChange(slideIndex, slideIndex + 1)
    } else {
      onTrue()
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
    if (!sandbox || !data?.length) return
    onBeforeChange(0, 0)
  }, [sandbox, data, lessonId])

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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type } = event.data
      if (type === 'nextSlide') {
        handleNext(event.data.skip)
      } else if (type === 'prevSlide') {
        handlePrev()
      } else if (type === 'goToSlide') {
        const targetIndex = event.data.slideIndex
        if (typeof targetIndex === 'number' && targetIndex >= 0 && targetIndex < data.length) {
          onBeforeChange(slideIndex, targetIndex)
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [handleNext, handlePrev, onBeforeChange, slideIndex, data.length])

  const slider = useMemo(() => {
    const currentSlide = data[slideIndex]
    console.log('currentSlide render', currentSlide) // eslint-disable-line no-console
    return (
      <Box
        className='sliderTour'
        height='100%'
        sx={boxSx}
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
          <SliderBlockAiLessonComing />
        ) : (
          <LoadingScreen text='Slide not found' />
        )}
      </Box>
    )
  }, [data, slideIndex, lesson, isLoadingLessonContent, isSlideReady])

  const editContentLayer = (
    <EditContentLayer
      key={slideIndex}
      isEditLesson={isEditLesson}
      setIsEditLesson={setIsEditLesson}
      isOpenModalCurrentSlideEdited={isOpenModalCurrentSlideEdited}
      setIsOpenModalCurrentSlideEdited={setIsOpenModalCurrentSlideEdited}
    />
  )

  return (
    <BaseBlock
      closeIcon={<TbArrowBarToLeft size={20} />}
      className='instructions'
      title={title}
      icon={icon}
      hideTabsHandler={() => {
        dispatch(toggleInstrations(true))
      }}
      takeHeaderSettings={takeHeaderSettings}
    >
      <Box sx={progressWrapperSx}>
        {data.map((_slide, index) => (
          <Box
            key={index}
            sx={{ bgcolor: `${slideIndex >= index ? '#708090' : '#D3D3D3'}`, ...PROGRESS_ITEM_SX }}
          />
        ))}
      </Box>
      {sandbox ? (
        <textarea
          style={{
            width: '100%',
            height: '100%',
            resize: 'none',
            padding: '10px 10px',
            border: 0,
            outline: 0,
            fontSize: '1.1rem',
            background: '#FAF9F6',
          }}
          placeholder='Add your notes here...'
          value={noteText}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setNoteText(event.target.value)
            localStorage.setItem(`sandboxNotes${profile?.id}`, event.target.value)
          }}
        />
      ) : (
        <>
          {editContentLayer}
          {slider}
          {!lessonMeta?.hideDefaultButtons && (
            <NextStep
              handleNext={handleNext}
              handlePrev={handlePrev}
              stepHasValidation={stepHasValidation}
              hasNextStep={hasNextStep}
              lessonName={lessonName}
            />
          )}
        </>
      )}
      <NextLessonDialog
        open={value}
        onClose={onFalse}
        onSubmitLesson={onSubmitLesson}
        lessonName={lessonName ?? ''}
      />
    </BaseBlock>
  )
}

const NextStep = ({
  handleNext,
  handlePrev,
  stepHasValidation,
  hasNextStep,
  lessonName,
}: NextStepProps) => {
  const nextStepAble = useSelector((state) => state.codePanelGlobal.nextStepAble)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)

  return (
    <Navigation
      hasPrev={slideIndex > 0}
      onNext={handleNext}
      onPrev={handlePrev}
      stepHasValidation={stepHasValidation}
      canMoveNext={nextStepAble || !stepHasValidation}
      hasNextStep={hasNextStep}
      lessonName={lessonName}
    />
  )
}

export default SliderBlock
