import { Step } from 'react-joyride'

import { Image } from '@root/src/components/image/Image'

export const getIntroStudentJoinSteps = (translate: (key: string) => string): Step[] => [
  {
    target: '.studentJoinStep1',
    title: <div>{translate('intro_tour_student_join_step_1_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        {translate('intro_tour_student_join_step_1_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'bottom' as const,
  },
  {
    target: '.studentJoinStep4',
    title: <div>{translate('intro_tour_student_join_step_2_title')}</div>,
    content: <div>{translate('intro_tour_student_join_step_2_subtitle')}</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.studentJoinStep2',
    title: <div>{translate('intro_tour_student_join_step_3_title')}</div>,
    content: <div>{translate('intro_tour_student_join_step_3_subtitle')}</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.studentJoinStep3',
    title: <div>{translate('intro_tour_student_join_step_4_title')}</div>,
    content: <div> {translate('intro_tour_student_join_step_4_subtitle')}</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
]
