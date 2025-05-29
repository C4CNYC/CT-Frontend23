import React, { type FC, useCallback, useEffect, useMemo, useState } from 'react'

import { Box, useTheme } from '@mui/material'
import { SlDirections } from '@react-icons/all-files/sl/SlDirections'
import { TbArrowBarToLeft } from '@react-icons/all-files/tb/TbArrowBarToLeft'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { LoadingScreen } from '@/components'
import useIsDesktop from '@/hooks/useIsDesktop'
import { LessonContentType } from '@/redux/enums/lesson-content-type.enum'
import { IIntegration } from '@/redux/interfaces/integration.interface'
import {
  setNextStepAble,
  setSlideId,
  setSlideIndex,
  setSolutionCode,
  toggleInstrations,
} from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import { CodeDocument } from '@/sections/code-panel/components/body/blocks/view-block/browser-view/index'
import BrowserView from '@/sections/code-panel/components/body/blocks/view-block/browser-view/index'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'
import { useDebounceCallback } from '@root/src/hooks'
import { useBoolean } from '@root/src/hooks/use-boolean'
import {
  useGetStudentLastVisitedSlideQuery,
  useUpdateStudentLastVisitedSlideMutation,
} from '@root/src/redux/services/manager/lesson-student'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'
import { progressGuestGetAll, progressGuestSet } from '@root/src/utils/progressLocalStorage'

import BaseBlock from '../base-block'

import {
  ISliderBlock,
  NextStepProps,
  PROGRESS_ITEM_SX,
  getBoxSx,
  getProgressWrapperSx,
} from './constants'
import Navigation from './navigation'
import { SaveEditContent } from './SaveEditContent'
import { SliderBlockAiLessonComing } from './SliderBlockAiLessonComing'

interface ISliderBlock {
  onSubmitLesson: () => void
  onSubmitChallenge: (slideId: string, code?: string) => void
  integrations: Array<IIntegration & BaseResponseInterface>
  lessonType?: string
  lessonName?: string
  lessonId?: string
  isLoadingLessonContent: boolean
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
import View from './View'

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
}) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()
  const translate = useTranslate()
  const searchParams = useSearchParams()
  const { lessonContent } = useLessonManager()
  let data = lessonContent ?? []
  const { value, onFalse, onTrue } = useBoolean()

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

  const hasNextStep = slideIndex < data?.length - 1
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

  const onBeforeChange = (_: number, next: number) => {
    if (!data || !data?.length) return
    dispatch(setSolutionCode(data[slideIndex]?.solution_body ?? ''))
    dispatch(setSlideIndex(next))
    let slideId = data[next]?.id
    if (slideId) dispatch(setSlideId(slideId))
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
    if (!sandbox || !data?.length) return
    onBeforeChange(0, 0)
  }, [sandbox, data])

  useEffect(() => {
    if (lastSlide?.slideNumber) {
      onBeforeChange(slideIndex, lastSlide.slideNumber)
    } else {
      let progress = progressGuestGetAll(lessonId as string)
      if (progress) {
        onBeforeChange(slideIndex, progress.lastSlide)
      }
    }
  }, [data, lastSlide])

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
        sx={boxSx}
      >
        {isLoadingLessonContent ? (
          <LoadingScreen />
        ) : currentSlide ? (
          <View
            title={currentSlide?.title}
            lessonType={lessonType}
            key={currentSlide?.id}
            type={currentSlide?.type}
            body={currentSlide?.body}
            integrations={integrations}
            connectIntegrations={connectIntegrations}
            stepBgColor={currentSlide?.bg_color}
          />
        ) : (
          <SliderBlockAiLessonComing />
        )}
      </Box>
    )
  }, [data, slideIndex, integrations, isLoadingLessonContent])

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
          <SaveEditContent />
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
          teacherView={true}
        />
      )
  }
}
export default SliderBlock
