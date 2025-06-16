import { Step } from 'react-joyride'

import { Image } from '@/components'

export const getDefaultAdminIntroSteps = (translate: (key: string) => string): Step[] => [
  {
    target: '.defaultIntroAdminStep1',
    title: <div>{translate('Adjust your tenant')}</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/illustration_org_edit.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        {translate('You can adjust your tenant settings')}
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.defaultIntroAdminStep2',
    title: <div>{translate('Student profile')}</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/illustration_student_account.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        {translate('You can go to your student profile')}
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
]
