import { Image } from '@/components'

export const STUDENT_DEFAULT_INTRO = [
  {
    target: '.defaultIntroStudentStep1',
    title: <div>💥 Join a tribe 💥</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        Enter a join code from jour teatcher
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.defaultIntroStudentStep2',
    title: <div>Menu</div>,
    content: <div>From here you can travel on the platform</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.defaultIntroStudentStep3',
    title: <div>Profile</div>,
    content: <div>Here you can edit your profile</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
]
