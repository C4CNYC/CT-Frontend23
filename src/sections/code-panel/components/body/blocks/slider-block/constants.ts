import { Theme, type SxProps } from '@mui/system'

import { LessonContentType } from '@/redux/enums/lesson-content-type.enum'
import { ILessonContent } from '@/redux/interfaces/content.interface'
import { IIntegration } from '@/redux/interfaces/integration.interface'
import { CodeDocument } from '@/sections/code-panel/components/body/blocks/view-block/browser-view/index'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
export const getBoxSx = (isDesktop: boolean, isOpenHeader: boolean): SxProps => ({
  overflowY: 'scroll',
  scrollbarWidth: 'none',
  height: isDesktop && isOpenHeader ? 'calc(100vh - 64px)' : '100vh',
  '&::-webkit-scrollbar': {
    width: 0,
  },
  '& .slick-slider': {
    height: '100%',
  },
  '& .slick-list': {
    height: '100%',
  },
  '& .slick-track': {
    height: '100%',
    '& .slick-slide': {
      '&  div:first-of-type': {
        height: '100%',
      },
    },
  },
})

export const getCarouselSettings = (onBeforeChange: (_: number, next: number) => void) => ({
  speed: 50,
  dots: false,
  arrows: false,
  slidesToShow: 1,
  draggable: false,
  slidesToScroll: 1,
  className: 'innerDiv',
  beforeChange: onBeforeChange,
})

export const LOADER_SCREEN_SX = {
  position: 'absolute',
  zIndex: 1,
  animation: '1.5s hide 2.5s forwards',
  '@keyframes hide': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
}

export const getProgressWrapperSx = (theme: Theme): SxProps => ({
  width: '100%',
  bgcolor: theme.palette.background.default,
  display: 'flex',
  gap: '2px',
  py: '4px',
  px: '10px',
})

export const PROGRESS_ITEM_SX = {
  height: 4,
  flex: 1,
  borderRadius: 16,
}

export interface NextStepProps {
  handleNext: (skip?: boolean) => void
  handlePrev: () => void
  stepHasValidation: boolean
  hasNextStep: boolean
  lessonName?: string
}

export interface ISliderBlock {
  data: Array<ILessonContent & BaseResponseInterface>
  onSubmitLesson: () => void
  onSubmitChallenge: (slideId: string, code?: string) => void
  integrations: Array<IIntegration & BaseResponseInterface>
  lessonType?: string
  lessonName?: string
  lessonId?: string
  isLoadingLessonContent: boolean
}

export interface IView {
  type: LessonContentType
  body: string
  integrations: IIntegration[]
  connectIntegrations: (body: string) => CodeDocument | null
  title?: string
  lessonType?: string
  stepBgColor?: string | undefined
}
