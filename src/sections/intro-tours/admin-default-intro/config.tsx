import { Step } from 'react-joyride'

import { Image } from '@/components'

export const getDefaultAdminIntroSteps = (translate: (key: string) => string): Step[] => [
  {
    target: '.defaultIntroAdminStep1',
    title: <div>{translate('manager_admin_intro_tour_step_1_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/illustration_org_edit.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px', maxWidth: '200px', margin: '0 auto' }}
        />
        {translate('manager_admin_intro_tour_step_1_desc')}
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.defaultIntroAdminStep2',
    title: <div>{translate('manager_admin_intro_tour_step_2_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/illustration_student_account.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px', maxWidth: '200px', margin: '0 auto' }}
        />
        {translate('manager_admin_intro_tour_step_2_desc')}
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
]
