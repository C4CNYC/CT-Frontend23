import { Image } from '@/components'

export const TOUR_STEPS_CLASS = [
  {
    target: '.tourClassStep1',
    title: <div>💥 Class creating! 💥</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        Here you will create your first class. Choose name and add some description.
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
]
