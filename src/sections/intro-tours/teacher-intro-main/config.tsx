import { Image } from '@/components'

export const TOUR_STEPS_MAIN = [
  {
    target: '.tourMainStep1',
    title: <div>💥 Welcome home! 💥</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        Here is your home page.
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.tourMainStep2',
    title: <div>Menu</div>,
    content: <div>From here you can travel on the platform</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.tourMainStep3',
    title: <div>Class info</div>,
    content: <div>Here you can see genearl info about current class</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.tourMainStep4',
    title: <div>Quests list </div>,
    content: <div>In this place will appear your asseiments</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.tourMainStep5',
    title: <div>Slider</div>,
    content: <div>It's contain information 📖 from the teacher</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
]
