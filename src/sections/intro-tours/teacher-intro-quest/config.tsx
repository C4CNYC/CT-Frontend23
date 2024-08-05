import { Image } from '@/components'

export const TOUR_STEPS_QUEST = [
  {
    target: '.tourQuestStep1',
    title: <div>💥 Quest creating! 💥</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        Here you will create your first quest for your team.
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
]
