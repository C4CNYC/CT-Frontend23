import { Step } from 'react-joyride'

import { Image } from '@root/src/components'

export const getDefaultStudentIntroSteps = (translate: (key: string) => string): Step[] => [
  {
    target: '.defaultIntroStudentStep1',
    title: <div>{translate('intro_tour_default_student_step_1_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        {translate('intro_tour_default_student_step_1_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.defaultIntroStudentStep2',
    title: <div>{translate('intro_tour_default_student_step_2_title')}</div>,
    content: <div> {translate('intro_tour_default_student_step_2_subtitle')}</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.defaultIntroStudentStep3',
    title: <div>{translate('intro_tour_default_student_step_3_title')}</div>,
    content: <div> {translate('intro_tour_default_student_step_3_subtitle')}</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
]
