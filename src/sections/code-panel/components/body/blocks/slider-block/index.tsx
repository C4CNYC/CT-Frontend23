import React, { type FC, useCallback, useEffect, useMemo, useState } from 'react'

import { Box, TextField, useTheme } from '@mui/material'
import { SlDirections } from '@react-icons/all-files/sl/SlDirections'
import { TbArrowBarToLeft } from '@react-icons/all-files/tb/TbArrowBarToLeft'
import isEmpty from 'lodash-es/isEmpty'
import { useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { EmptyContent } from '@/components'
import useIsDesktop from '@/hooks/useIsDesktop'
import { LessonContentType } from '@/redux/enums/lesson-content-type.enum'
import { ILessonContent } from '@/redux/interfaces/content.interface'
import { IIntegration } from '@/redux/interfaces/integration.interface'
import {
  setNextStepAble,
  setSlideId,
  setSlideIndex,
  setSolutionCode,
  toggleInstrations,
} from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import BrowserView, {
  CodeDocument,
} from '@/sections/code-panel/components/body/blocks/view-block/browser-view/index'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'
import { useDebounceCallback } from '@root/src/hooks'
import {
  useGetStudentLastVisitedSlideQuery,
  useUpdateStudentLastVisitedSlideMutation,
} from '@root/src/redux/services/manager/lesson-student'

import BaseBlock from '../base-block'

import { PROGRESS_ITEM_SX, getBoxSx, getProgressWrapperSx } from './constants'
import Navigation from './navigation'

interface ISliderBlock {
  data: Array<ILessonContent & BaseResponseInterface>
  onSubmitLesson: () => void
  onSubmitChallenge: (slideId: string, code?: string) => void
  integrations: Array<IIntegration & BaseResponseInterface>
  lessonType?: string
  lessonName?: string
  lessonId?: string
}

interface IView {
  type: LessonContentType
  body: string
  integrations: IIntegration[]
  connectIntegrations: (body: string) => CodeDocument | null
  title?: string
  lessonType?: string
  stepBgColor?: string | undefined
}

const icon = (
  <SlDirections
    size='20px'
    color='#43D4DD'
  />
)

const SliderBlock: FC<ISliderBlock> = ({
  data,
  onSubmitLesson,
  onSubmitChallenge,
  integrations,
  lessonType,
  lessonName,
  lessonId,
}) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()
  const translate = useTranslate()
  const searchParams = useSearchParams()

  const sandbox = searchParams.get('sandbox')

  const profile = useSelector((state) => state.global.user)
  const unit = useSelector((state) => state.codePanelGlobal.unitId)
  const course = useSelector((state) => state.codePanelGlobal.courseId)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)

  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(true)
  const [noteText, setNoteText] = useState(localStorage.getItem(`sandboxNotes${profile?.id}`) ?? '')

  const [updateLastVisitedSlide] = useUpdateStudentLastVisitedSlideMutation()
  const { data: lastSlide, isLoading: isLastSlideLoading } = useGetStudentLastVisitedSlideQuery(
    {
      id: lessonId as string,
    },
    { skip: !lessonId || !profile }
  )

  const handleDebouncedCallback = useDebounceCallback(5000)

  const hasNextStep = slideIndex < data.length - 1
  const stepHasValidation = !!data[slideIndex]?.validations?.length
  const title = sandbox ? translate('Notes') : translate('instructions')
  const progressWrapperSx = useMemo(() => getProgressWrapperSx(theme), [theme])
  const boxSx = useMemo(() => getBoxSx(isDesktop, isOpenHeader), [isDesktop, isOpenHeader])

  const takeHeaderSettings = useCallback((isOpen: boolean) => {
    setIsOpenHeader(isOpen)
  }, [])

  const handlePrev = (): void => {
    if (slideIndex > 0) {
      onBeforeChange(slideIndex, slideIndex - 1)
    }
  }

  const handleNext = (skip = false): void => {
    if (window.gtag) {
      window.gtag('event', 'Slide_Swiped', {
        event_category: `Course ${course} > Unit ${unit} > Lesson ${lessonName}`,
        event_label: `SlideNumber ${slideIndex + 1}`,
      })
    }
    if (stepHasValidation && !skip) {
      if (window.gtag) {
        window.gtag('event', 'Challenge_Completed', {
          event_category: `Course ${course} > Unit (Module) ${unit} > Training (Lesson) ${lessonName}`,
          event_label: `SlideNumber ${slideIndex + 1}`,
        })
      }
      onSubmitChallenge(data[slideIndex].id, '')
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
      const progress = localStorage.getItem(`${lessonId}_progress`)
      let newProgress: any = {}
      if (progress) {
        newProgress = JSON.parse(progress)
      }
      if (lessonId) {
        newProgress[lessonId as string] = next
      }
      localStorage.setItem(`${lessonId}_progress`, JSON.stringify(newProgress))
    }
  }

  const onBeforeChange = (_: number, next: number) => {
    if (!data || !data.length) return
    dispatch(setSolutionCode(data[slideIndex]?.solution_body ?? ''))
    dispatch(setSlideIndex(next))
    dispatch(setSlideId(data[next].id))
  }

  const connectIntegrations = (body: string): CodeDocument | null => {
    if (integrations) {
      return {
        htmlBody: body ? JSON.parse(body).content : '',
        cssBody: integrations.reduce((ac, cur) => ac + cur.head, ''),
        jsBody: integrations.reduce((ac, cur) => ac + cur.scripts, ''),
      }
    }
    return null
  }

  useEffect(() => {
    if (!sandbox || !data.length) return
    onBeforeChange(0, 0)
  }, [sandbox, data])

  useEffect(() => {
    if (lastSlide?.slideNumber) {
      onBeforeChange(slideIndex, lastSlide.slideNumber)
    }
  }, [data, lastSlide])

  useEffect(() => {
    dispatch(setNextStepAble(false))
    handleDebouncedCallback(() => {
      if (slideIndex >= 0) onUpdateLastSlide(slideIndex)
    })
  }, [slideIndex])

  useEffect(() => {
    const progress = JSON.parse(localStorage?.getItem(`${lessonId}_progress`) || '{}')
    if (!data || !lessonId || data.length == 0) return
    if (lessonId && progress) {
      const lastSlide: number = progress[lessonId as string] || 0
      onBeforeChange(slideIndex, lastSlide)
    }
  }, [lessonId, data])

  const slider = useMemo(() => {
    return (
      <Box
        className='sliderTour'
        height='100%'
        sx={boxSx}
      >
        {data
          .filter((slide, stepSlideIndex) => slideIndex == stepSlideIndex)
          .map((step) => {
            return (
              <View
                title={step.title}
                lessonType={lessonType}
                key={step.id}
                type={step.type}
                body={step.body}
                integrations={integrations}
                connectIntegrations={connectIntegrations}
                stepBgColor={step.bg_color}
              />
            )
          })}
      </Box>
    )
  }, [data, slideIndex, integrations])

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
        {data.map((slide, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: `${slideIndex >= index ? '#708090' : '#D3D3D3'}`,
              ...PROGRESS_ITEM_SX,
            }}
          ></Box>
        ))}
      </Box>
      {sandbox ? (
        <TextField
          fullWidth
          multiline
          minRows='12'
          value={noteText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNoteText(event.target.value)
            localStorage.setItem(`sandboxNotes${profile?.id}`, event.target.value)
          }}
        />
      ) : isEmpty(data) ? (
        <EmptyContent title={translate('messages_no_data')} />
      ) : (
        <>
          {slider}
          <NextStep
            handleNext={handleNext}
            handlePrev={handlePrev}
            stepHasValidation={stepHasValidation}
            hasNextStep={hasNextStep}
            lessonName={lessonName}
          />
        </>
      )}
    </BaseBlock>
  )
}

interface NextStepProps {
  handleNext: (skip?: boolean) => void
  handlePrev: () => void
  stepHasValidation: boolean
  hasNextStep: boolean
  lessonName?: string
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

const View: FC<IView> = ({
  type,
  body,
  connectIntegrations,
  title,
  lessonType,
  stepBgColor,
  integrations,
}) => {
  switch (type) {
    default:
    case 'code':
      return (
        <BrowserView
          integrations={integrations}
          document={connectIntegrations(body)}
          stepBgColor={stepBgColor}
        />
      )
  }
}

export default React.memo(SliderBlock)
