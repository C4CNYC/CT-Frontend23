import { Step } from 'react-joyride'

export const getLessonCreationSteps = (translate: (key: string) => string): Step[] => [
  {
    target: '.lessonCreationStep1',
    title: <div>{translate('intro_tour_lesson_creation_step_1_title')}</div>,
    content: (
      <div>
        <p>{translate('intro_tour_lesson_creation_step_1_subtitle')}</p>
        <p>{translate('intro_tour_lesson_creation_step_1_subtitle_2')}</p>
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.lessonCreationStep2',
    title: <div>{translate('intro_tour_lesson_creation_step_2_title')}</div>,
    content: <div>{translate('intro_tour_lesson_creation_step_2_subtitle')}</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.lessonCreationStep3',
    title: <div>{translate('intro_tour_lesson_creation_step_3_title')}</div>,
    content: <div>{translate('intro_tour_lesson_creation_step_3_subtitle')}</div>,
    disableBeacon: true,
    placement: 'auto' as const,
  },
  {
    target: '.lessonCreationStep4',
    title: <div>{translate('intro_tour_lesson_creation_step_4_title')}</div>,
    content: <div>{translate('intro_tour_lesson_creation_step_4_subtitle')}</div>,
    disableBeacon: true,
    placement: 'auto' as const,
    styles: {
      spotlight: {
        marginTop: '-750px',
        height: '850px',
      },
    },
  },
]
