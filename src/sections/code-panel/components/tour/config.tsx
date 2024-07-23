import { Box } from '@mui/material'

import { Image } from '@/components'

export const TOUR_STEPS_DECKTOP = [
  {
    target: '.tourStart',
    title: <div>💥 Hi coder! 💥</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        I'will show you what do we have here. The Code Panel consists of:
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.instructions',
    title: <div>Slider</div>,
    content: <div>It's contain information 📖 from the teacher</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.instructions',
    title: <div>Challenge</div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/challenge.svg'
          alt='challenge preview'
          sx={{ py: 1, minHeight: '260px' }}
        />
        See a Challenge ⚔️ slide? That means it’s time to code in the editor.
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.controls',
    title: <div>Controls</div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/controls.svg'
          alt='controls preview'
          sx={{ py: 1, minHeight: '160px' }}
        />
        On “Challenge” slides you can also “Skip” ⏭️ and come back later 🔙 if you get stuck.
      </div>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.codeEditorTour',
    title: <div>Code Editor</div>,
    content: (
      <div>
        <div>
          <iframe
            src='https://giphy.com/embed/7NoNw4pMNTvgc'
            width='100%'
            height='100%'
            frameBorder='0'
            allowFullScreen
          ></iframe>
        </div>
        Here’s your Code Editor 👩🏽‍💻 where you’ll build cool stuff. 😎
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.checkers',
    title: <div>Tests 🧪</div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/checkers.svg'
          alt='checkers preview'
          sx={{ py: 1, minHeight: '160px' }}
        />
        When available, click this to see what code is missing ⚔👀 for the challenge.
      </div>
    ),
    disableBeacon: true,
    placement: 'left' as const,
  },
  {
    target: '.toolbox',
    title: <div> Toolbox 🧰 </div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/toolbox.svg'
          alt='checkers preview'
          sx={{ py: 1, minHeight: '160px' }}
        />
        Here’s undo, redo, copy & paste. Tap on {} to see the characters.
      </div>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.lessonsTour',
    title: <div>Lesons list</div>,
    content: <div>Feel free to choose lesson which you want 😉</div>,
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.tourStart',
    title: <div>Most important: Have fun! 🤪</div>,
    content: <Box sx={{ py: 1 }}> And on Feedback 💬 let us know what you find 🏆 or 💩.</Box>,
    disableBeacon: true,
    placement: 'center' as const,
  },
]

export const TOUR_STEPS_MOBILE = [
  {
    target: '.tourStart',
    title: <div>💥 Hi coder! 💥</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '180px' }}
        />
        I'will show you what do we have here. The Code Panel consists of:
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.sliderTour',
    title: <div>Slider</div>,
    content: <div>It's contain information 📖 from the teacher</div>,
    disableBeacon: true,
  },
  {
    target: '.sliderTour',
    title: <div>Challenge</div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/challenge.svg'
          alt='challenge preview'
          sx={{ py: 1 }}
        />
        See a Challenge ⚔️ slide? That means it’s time to code in the editor.
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.controls',
    title: <div>Controls</div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/controls.svg'
          alt='controls preview'
          sx={{ py: 1, minHeight: '160px' }}
        />
        On “Challenge” slides you can also “Skip” ⏭️ and come back later 🔙 if you get stuck.
      </div>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.smallSliderTour',
    title: <div>Navigation</div>,
    content: <div>Here you can change this tabs</div>,
    disableBeacon: true,
  },
  {
    target: '.lessonsTourMobile',
    title: <div>Lessons list</div>,
    content: <div>Feel free to choose lesson which you want 😉</div>,
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.tourStart',
    title: <div>Most important: Have fun! 🤪</div>,
    content: <Box sx={{ py: 1 }}> And on Feedback 💬 let us know what you find 🏆 or 💩.</Box>,
    disableBeacon: true,
    placement: 'center' as const,
  },
]
