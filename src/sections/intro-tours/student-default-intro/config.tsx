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
        Enter a join-code from your teacher.
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.defaultIntroStudentStep2',
    title: <div>Catalog</div>,
    content: <div>This is where you choose your adventure and start coding.</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.defaultIntroStudentStep3',
    title: <div>Register</div>,
    content: <div>Register here or login to save your progress.</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
]
