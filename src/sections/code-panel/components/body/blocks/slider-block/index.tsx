import React, { type FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box, useTheme } from '@mui/material'
import { SlDirections } from '@react-icons/all-files/sl/SlDirections'
import { TbArrowBarToLeft } from '@react-icons/all-files/tb/TbArrowBarToLeft'
import * as _ from 'lodash-es'
import dynamic from 'next/dynamic'
import { useDispatch } from 'react-redux'
import Carousel from 'react-slick'

import { EmptyContent, LoadingScreen } from '@/components'
import useIsDesktop from '@/hooks/useIsDesktop'
import { LessonContentType } from '@/redux/enums/lesson-content-type.enum'
import { ILessonContent } from '@/redux/interfaces/content.interface'
import { IIntegration } from '@/redux/interfaces/integration.interface'
import {
  setNextStepAble,
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
import {
  useGetStudentLastVisitedSlideQuery,
  useUpdateStudentLastVisitedSlideMutation,
} from '@root/src/redux/services/manager/lesson-student'

import BaseBlock from '../base-block'

import {
  LOADER_SCREEN_SX,
  PROGRESS_ITEM_SX,
  getBoxSx,
  getCarouselSettings,
  getProgressWrapperSx,
} from './constants'
import Navigation from './navigation'

const ProsaMirrorView = dynamic(async () => await import('./prosa-mirror-view'), { ssr: false })

interface ISliderBlock {
  data: Array<ILessonContent & BaseResponseInterface>
  onSubmitLesson: () => void
  onSubmitChallenge: (slideId: string, code?: string) => void
  integrations: Array<IIntegration & BaseResponseInterface>
  isFetching: boolean
  code: string
}

interface IView {
  type: LessonContentType
  body: string
  connectIntegrations: (body: string) => CodeDocument | null
  title?: string
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
  isFetching,
  code,
}) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const nextStepAble = useSelector((state) => state.codePanelGlobal.nextStepAble)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const translate = useTranslate()
  const isDesktop = useIsDesktop()

  const [updateLastVisitedSlide] = useUpdateStudentLastVisitedSlideMutation()
  const { data: lastSlide } = useGetStudentLastVisitedSlideQuery(
    {
      id: lessonId as string,
    },
    { skip: !lessonId }
  )

  // console.log('last slide from slide-block component', lastSlide?.slideNumber)

  const title = translate('instructions')
  const takeHeaderSettings = useCallback((isOpen: boolean) => {
    setIsOpenHeader(isOpen)
  }, [])

  const progressWrapperSx = useMemo(() => getProgressWrapperSx(theme), [theme])
  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(true)

  const carousel1 = useRef<Carousel | null>(null)
  const [nav2, setNav2] = useState<Carousel>()
  const hasNextStep = slideIndex < data.length - 1
  const stepHasValidation = !!data[slideIndex]?.validations?.length
  const boxSx = useMemo(() => getBoxSx(isDesktop, isOpenHeader), [isDesktop, isOpenHeader])

  useEffect(() => {
    if (carousel1.current) {
      setNav2(carousel1.current)
      carousel1.current.slickGoTo(lastSlide?.slideNumber ?? 0)
    }
  }, [data])

  useEffect(() => {
    dispatch(setNextStepAble(false))
  }, [slideIndex])
  const handlePrev = (): void => {
    carousel1.current?.slickPrev()
  }

  const handleNext = (skip = false): void => {
    if (stepHasValidation && !skip) {
      onSubmitChallenge(data[slideIndex].id, code)
    }
    if (hasNextStep) {
      carousel1.current?.slickNext()
    } else {
      onSubmitLesson()
    }
  }

  const onUpdateLastSlide = (next: number) => {
    updateLastVisitedSlide({ lessonId: lessonId as string, slideNumber: next })
  }

  const onBeforeChange = (_: number, next: number) => {
    dispatch(setSolutionCode(data[slideIndex]?.solution_body ?? ''))
    dispatch(setSlideIndex(next))
  }

  const connectIntegrations = (body: string): CodeDocument | null => {
    if (integrations) {
      return {
        htmlBody: body ? [JSON.parse(body).content] : [''],
        cssBody: [integrations.reduce((ac, cur) => ac + cur.head, '')],
        jsBody: [integrations.reduce((ac, cur) => ac + cur.scripts, '')],
      }
    }
    return null
  }

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
      {!isFetching ? (
        <>
          {_.isEmpty(data) ? (
            <EmptyContent title={translate('messages_no_data')} />
          ) : (
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
                  {data.map((step) => {
                    return (
                      <View
                        title={step.title}
                        key={step.id}
                        type={step.type}
                        body={step.body}
                        connectIntegrations={connectIntegrations}
                      />
                    )
                  })}
                </Carousel>
              </Box>

              <Navigation
                hasPrev={slideIndex > 0}
                onNext={handleNext}
                onPrev={handlePrev}
                stepHasValidation={stepHasValidation}
                canMoveNext={nextStepAble || !stepHasValidation}
                hasNextStep={hasNextStep}
              />
            </>
          )}
        </>
      ) : (
        <LoadingScreen sx={LOADER_SCREEN_SX} />
      )}
    </BaseBlock>
  )
}

const View: FC<IView> = ({ type, body, connectIntegrations, title }) => {
  const translate = useTranslate()

  switch (type) {
    case 'editable':
      return (
        <ProsaMirrorView
          title={title}
          multimediaValue={body}
        />
      )
    case 'code':
      return <BrowserView document={connectIntegrations(body)} />
    default:
      return <>{translate('messages_content_type_not_supported')}</>
  }
}

export default React.memo(SliderBlock)
