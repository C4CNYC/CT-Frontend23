import { Step } from 'react-joyride'

export const getIntroMainSteps = (translate: (key: string) => string): Step[] => [
  {
    target: '.tourMainStep2',
    title: <div>{translate('intro_tour_main_step_1_title')} </div>,
    content: <div>{translate('intro_tour_main_step_1_subtitle')}</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.tourMainStep3',
    title: <div>{translate('intro_tour_main_step_2_title')}</div>,
    content: <div>{translate('intro_tour_main_step_2_subtitle')}</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.tourMainStep4',
    title: <div>{translate('intro_tour_main_step_3_title')}</div>,
    content: <div>{translate('intro_tour_main_step_3_subtitle')}</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
]
