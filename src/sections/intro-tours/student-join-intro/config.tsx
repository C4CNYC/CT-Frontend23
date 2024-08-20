import { Image } from '@/components'

export const STUDENT_JOIN_INTRO = [
  {
    target: '.studentJoinStep1',
    title: <div>💥 Hi student! 💥</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        Here you will create your first info about your class.
      </div>
    ),
    disableBeacon: true,
    placement: 'bottom' as const,
  },
  {
    target: '.studentJoinStep2',
    title: <div>List of tribes</div>,
    content: <div>You can switch the classes hear</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.studentJoinStep3',
    title: <div>Connect</div>,
    content: <div>And with this button you can connect to new class</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
]
