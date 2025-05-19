import { Box } from '@mui/material'
import { Step } from 'react-joyride'

import { Image } from '@/components'

export type TourStep = Step & { button?: React.ReactNode }

export const getTourStepsDesktop = (translate: (key: string) => string): TourStep[] => [
  {
    target: '.tourStart',
    title: <div>{translate('cp_teacher_tour.0.title')}</div>,
    content: (
      <div>
        <div style={{ fontSize: '10rem', textAlign: 'center' }}>🐻</div>
        {translate('cp_teacher_tour.0.body')}
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
    button: translate('cp_teacher_tour.0.button'),
  },
  {
    target: '.instructions',
    title: <div>{translate('cp_teacher_tour.1.title')}</div>,
    content: (
      <div>
        <p>{translate('cp_teacher_tour.1.body')}</p>
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
    button: translate('cp_teacher_tour.1.button'),
  },
  {
    target: '.codeEditorTour',
    title: <div>{translate('cp_teacher_tour.2.title')}</div>,
    content: (
      <div>
        <video
          src='/assets/tour_images/cat_typing.mp4'
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: 'auto' }}
        ></video>
        {translate('cp_teacher_tour.2.body')}
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
    button: translate('cp_teacher_tour.2.button'),
  },
  {
    target: '.ChatPlace',
    title: <div>{translate('cp_teacher_tour.3.title')}</div>,
    content: <div>{translate('cp_teacher_tour.3.body')}</div>,
    disableBeacon: true,
    placement: 'left' as const,
    button: translate('cp_teacher_tour.3.button'),
  },
  {
    target: '.instructions',
    title: <div> {translate('cp_teacher_tour.4.title')} </div>,
    content: (
      <div>
        <p> {translate('cp_teacher_tour.4.body')}</p>
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
    button: translate('cp_teacher_tour.4.button'),
  },
  {
    target: '.feedback-button',
    title: <div>{translate('cp_teacher_tour.5.title')}</div>,
    content: <Box sx={{ py: 1, textAlign: 'left' }}>{translate('cp_teacher_tour.5.body')}</Box>,
    disableBeacon: true,
    placement: 'top' as const,
    button: translate('cp_teacher_tour.5.button'),
  },
]

export const getTourStepsMobile = (translate: (key: string) => string): Step[] => [
  {
    target: '.tourStart',
    title: <div>{translate('intro_tour_step_1_mobile_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.webp'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '180px' }}
        />
        {translate('intro_tour_step_1_mobile_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.sliderTour',
    title: <div>{translate('intro_tour_step_2_mobile_title')}</div>,
    content: <div>{translate('intro_tour_step_2_mobile_subtitle')}</div>,
    disableBeacon: true,
  },
  {
    target: '.sliderTour',
    title: <div>{translate('intro_tour_step_3_mobile_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/challenge.webp'
          alt='challenge preview'
          sx={{ py: 1 }}
        />
        {translate('intro_tour_step_3_mobile_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.controls',
    title: <div>{translate('intro_tour_step_4_mobile_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/controls.webp'
          alt='controls preview'
          sx={{ py: 1, minHeight: '160px' }}
        />
        {translate('intro_tour_step_4_mobile_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.smallSliderTour',
    title: <div>{translate('intro_tour_step_5_mobile_title')}</div>,
    content: <div>{translate('intro_tour_step_5_mobile_subtitle')}</div>,
    disableBeacon: true,
  },
  {
    target: '.lessonsTourMobile',
    title: <div>{translate('intro_tour_step_6_mobile_title')}</div>,
    content: <div>{translate('intro_tour_step_6_mobile_subtitle')}</div>,
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.feedback-button',
    title: <div>{translate('intro_tour_step_7_mobile_title')}</div>,
    content: (
      <Box sx={{ py: 1, textAlign: 'center' }}>
        {translate('intro_tour_step_7_mobile_subtitle')}
      </Box>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
]
