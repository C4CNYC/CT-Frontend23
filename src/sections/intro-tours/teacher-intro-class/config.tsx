import { Image } from '@/components'

export const TOUR_STEPS_CLASS = [
  {
    target: '.tourClassStep1',
    title: <div>💥 Creating a Tribe 💥</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        Here you will create your first class. Choose a name and add a description.
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
]
