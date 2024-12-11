import React, { type FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box, TextField, useTheme } from '@mui/material'
import { SlDirections } from '@react-icons/all-files/sl/SlDirections'
import { TbArrowBarToLeft } from '@react-icons/all-files/tb/TbArrowBarToLeft'
import * as _ from 'lodash-es'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import Carousel from 'react-slick'

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
  toggleInstructions,
} from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import BrowserView, {
  CodeDocument,
} from '@/sections/code-panel/components/body/blocks/view-block/browser-view/index'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import {
  useGetStudentLastVisitedSlideQuery,
  useUpdateStudentLastVisitedSlideMutation,
} from '@root/src/redux/services/manager/lesson-student'

import BaseBlock from '../base-block'

import { PROGRESS_ITEM_SX, getBoxSx, getCarouselSettings, getProgressWrapperSx } from './constants'
import Navigation from './navigation'
import { tabsLocalStorageManger } from './sliderLocalStorageManger'

const ProsaMirrorView = dynamic(async () => await import('./prosa-mirror-view'), { ssr: false })
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

const SliderBlockWrapper: FC<ISliderBlock> = (props) => {
  const dispatch = useDispatch()
  const translate = useTranslate()
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAuthContext()

  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(true)

  const slideIndexRedux = useSelector((state) => state.codePanelGlobal.slideIndex)

  const title = useMemo(
    () => (searchParams.get('sandbox') ? translate('Notes') : translate('instructions')),
    [searchParams]
  )

  const {
    data: lastSlide,
    isFetching: isLastSlideFetching,
    isLoading: isLastSlideLoading,
  } = useGetStudentLastVisitedSlideQuery(
    {
      id: props.lessonId as string,
    },
    { skip: !props.lessonId || !isAuthenticated }
  )

  const localStorageKey = useMemo(() => `${props.lessonId}_progress`, [props.lessonId])

  const slideIndex = useMemo(() => {
    if (isLastSlideLoading || !props.lessonId) return null

    if (isAuthenticated) {
      return lastSlide?.slideNumber ?? slideIndexRedux
    }

    return tabsLocalStorageManger(localStorageKey).getProgress(props.lessonId as string)
  }, [slideIndexRedux, isLastSlideFetching, isLastSlideLoading, isAuthenticated, props.lessonId])

  return (
    <BaseBlock
      icon={icon}
      title={title}
      className='instructions'
      closeIcon={<TbArrowBarToLeft size={20} />}
      hideTabsHandler={() => {
        dispatch(toggleInstructions(true))
      }}
      takeHeaderSettings={setIsOpenHeader}
    >
      {slideIndex !== null && (
        <SliderBlock
          {...props}
          slideIndex={slideIndex}
          isOpenHeader={isOpenHeader}
        />
      )}
    </BaseBlock>
  )
}

const SliderBlock: FC<ISliderBlock & { isOpenHeader: boolean; slideIndex: number }> = memo(
  ({
    data,
    onSubmitLesson,
    onSubmitChallenge,
    integrations,
    lessonType,
    lessonName,
    lessonId,
    slideIndex,
    isOpenHeader,
  }) => {
    const carousel1 = useRef<Carousel | null>(null)

    const theme = useTheme()
    const dispatch = useDispatch()
    const isDesktop = useIsDesktop()
    const translate = useTranslate()
    const searchParams = useSearchParams()
    const { isAuthenticated, user } = useAuthContext()

    const sandbox = searchParams.get('sandbox')

    const unit = useSelector((state) => state.codePanelGlobal.unitId)
    const course = useSelector((state) => state.codePanelGlobal.courseId)

    const [nav2, setNav2] = useState<Carousel>()
    const [noteText, setNoteText] = useState(localStorage.getItem(`sandboxNotes${user?.id}`) ?? '')

    const [updateLastVisitedSlide] = useUpdateStudentLastVisitedSlideMutation()

    const stepHasValidation = useMemo(
      () => !!data[slideIndex]?.validations?.length,
      [data, slideIndex]
    )
    const localStorageKey = useMemo(() => `${lessonId}_progress`, [lessonId])
    const progressWrapperSx = useMemo(() => getProgressWrapperSx(theme), [theme])
    const hasNextStep = useMemo(() => slideIndex < data.length - 1, [slideIndex, data])
    const boxSx = useMemo(() => getBoxSx(isDesktop, isOpenHeader), [isDesktop, isOpenHeader])

    const handlePrev = (): void => {
      carousel1.current?.slickPrev()
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
        carousel1.current?.slickNext()
      } else {
        onSubmitLesson()
      }
    }

    const onUpdateLastSlide = useCallback(
      (next: number) => {
        if (isAuthenticated) {
          updateLastVisitedSlide({ lessonId: lessonId as string, slideNumber: next })

          return
        }

        tabsLocalStorageManger(localStorageKey).setSlideIndex(lessonId as string, next)
      },
      [isAuthenticated, lessonId]
    )

    const onBeforeChange = (_: number, next: number) => {
      dispatch(setSolutionCode(data[slideIndex]?.solution_body ?? ''))
      dispatch(setSlideIndex(next))
      dispatch(setSlideId(data[next].id))
    }

    const connectIntegrations = useCallback(
      (body: string): CodeDocument | null => {
        if (!integrations) return null

        return {
          htmlBody: body ? JSON.parse(body).content : '',
          cssBody: integrations.reduce((ac, cur) => ac + cur.head, ''),
          jsBody: integrations.reduce((ac, cur) => ac + cur.scripts, ''),
        }
      },
      [integrations, integrations]
    )

    useEffect(() => {
      dispatch(setNextStepAble(false))
    }, [slideIndex])

    useEffect(() => {
      if (carousel1.current === null) return

      if (isAuthenticated) {
        setNav2(carousel1.current)
        carousel1.current.slickGoTo(slideIndex ?? 0)

        return
      }

      carousel1.current.slickGoTo(
        tabsLocalStorageManger(localStorageKey).getProgress(lessonId as string)
      )
    }, [lessonId, carousel1, slideIndex, isAuthenticated])

    const content = useMemo(() => {
      if (_.isEmpty(data)) {
        if (sandbox) {
          return (
            <TextField
              fullWidth
              multiline
              minRows='12'
              value={noteText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNoteText(event.target.value)
                localStorage.setItem(`sandboxNotes${user?.id}`, event.target.value)
              }}
            />
          )
        }
        return <EmptyContent title={translate('messages_no_data')} />
      }

      return (
        <>
          <Box
            className='sliderTour'
            height='100%'
            sx={boxSx}
          >
            <Carousel
              {...getCarouselSettings(onBeforeChange)}
              asNavFor={nav2}
              ref={carousel1}
              afterChange={onUpdateLastSlide}
            >
              {data.map((step, stepSlideIndex) => {
                return slideIndex == stepSlideIndex ? (
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
                ) : (
                  <div key={step.id}></div>
                )
              })}
            </Carousel>
          </Box>
        </>
      )
    }, [
      data,
      integrations,
      lessonName,
      lessonType,
      boxSx,
      nav2,
      stepHasValidation,
      hasNextStep,
      stepHasValidation,
    ])

    return (
      <>
        <Box sx={progressWrapperSx}>
          {data.map((slide, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: `${slideIndex || 0 >= index ? '#708090' : '#D3D3D3'}`,
                ...PROGRESS_ITEM_SX,
              }}
            ></Box>
          ))}
        </Box>
        {content}
        <NextStep
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepHasValidation={stepHasValidation}
          hasNextStep={hasNextStep}
          lessonName={lessonName}
        />
      </>
    )
  }
)

interface NextStepProps {
  handleNext: (skip?: boolean) => void
  handlePrev: () => void
  stepHasValidation: boolean
  hasNextStep: boolean
  lessonName?: string
}

const NextStep = memo(
  ({ lessonName, hasNextStep, handleNext, handlePrev, stepHasValidation }: NextStepProps) => {
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
)

const View: FC<IView> = ({
  type,
  body,
  title,
  lessonType,
  stepBgColor,
  integrations,
  connectIntegrations,
}) => {
  switch (type) {
    case 'code':
      return (
        <BrowserView
          integrations={integrations}
          document={connectIntegrations(body)}
          stepBgColor={stepBgColor}
        />
      )
    default:
    case 'editable':
      return (
        <ProsaMirrorView
          title={title}
          multimediaValue={body}
          lessonType={lessonType}
          stepBgColor={stepBgColor}
        />
      )
  }
}

export default React.memo(SliderBlockWrapper)
