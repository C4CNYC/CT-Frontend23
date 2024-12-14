import { Image } from '@/components'

export const STUDENT_JOIN_INTRO = [
  {
    target: '.studentJoinStep1',
    title: <div>💥 Tribe Details 💥</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        Here you’ll see all the details for your Tribe or Class.
      </div>
    ),
    disableBeacon: true,
    placement: 'bottom' as const,
  },
  {
    target: '.studentJoinStep4',
    title: <div>Quests ( Assignments )</div>,
    content: (
      <div>
        Here you’ll see all the assignments you have. A quest can assign a short lesson or a full
        course. Click on it to see the details.
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.studentJoinStep2',
    title: <div>Switch or Join New Tribes</div>,
    content: (
      <div>
        Click on a Tribe icon to switch to another Tribe (or Class.) To join a new Tribe, just click
        on the “+” and enter the join-code.
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.studentJoinStep3',
    title: <div>Exciting Catalog</div>,
    content: <div>Choose a project you love and start coding.</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
]
