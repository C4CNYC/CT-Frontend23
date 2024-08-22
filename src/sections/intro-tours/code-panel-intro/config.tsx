import { Box, Button } from '@mui/material'

import { Image } from '@/components'

import LessonFeedback from '../../code-panel/components/footer/lesson-feedback/LessonFeedback'

export const TOUR_STEPS_DECKTOP = [
  {
    target: '.tourStart',
    title: <div>💥 The Coding Panel 👩‍💻 💥</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        Here is where all the learning and building happens. 🤩
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.instructions',
    title: <div>The Slides</div>,
    content: (
      <div>
        Here you'll see exciting things 💎💫 and they will tell you what to code. ✍🏽 🤖 Just follow
        step by step.
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.instructions',
    title: <div>Challenge Slides</div>,
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
    target: '.tourStart',
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
    placement: 'center' as const,
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
        Here’s undo, redo, copy & paste. <br /> Tap on{' '}
        <Box
          sx={{
            display: 'inline-block',
            fontWeight: 'bold',
            background: 'rgba(251, 221, 63, .4)',
            px: 1,
            borderRadius: 1,
          }}
        >
          &#123; &#125;
        </Box>{' '}
        see the characters.
      </div>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.lessonsTour',
    title: <div>Lessons List</div>,
    content: (
      <div>
        See where you are in the Module 🤷🏾‍♂️ and easily go back and review previous lessons. 👀 😉
      </div>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.tourStart',
    title: <div>Most important: Have fun! 🤪</div>,
    content: (
      <Box sx={{ py: 1 }}>
        {' '}
        And on Feedback 💬 let us know what you think: Wonderful 🏆 or Poopie 💩?
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2 }}>
          <LessonFeedback lessonName={'Intro tour'}>
            <Button
              variant='soft'
              sx={{ textTransform: 'uppercase' }}
            >
              Leave a feedback
            </Button>
          </LessonFeedback>
        </Box>
      </Box>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
]

export const TOUR_STEPS_MOBILE = [
  {
    target: '.tourStart',
    title: <div>💥 The Coding Panel 👩‍💻 💥</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.png'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '180px' }}
        />
        Here is where all the learning and building happens. 🤩
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.sliderTour',
    title: <div>The Slides</div>,
    content: (
      <div>
        Here you'll see exciting things 💎💫 and they will tell you what to code. ✍🏽 🤖 Just follow
        step by step.
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '.sliderTour',
    title: <div>Challenge Slides</div>,
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
    title: <div>Lessons List</div>,
    content: (
      <div>
        See where you are in the Module 🤷🏾‍♂️ and easily go back and review previous lessons. 👀 😉
      </div>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.tourStart',
    title: <div>Most important: Have fun! 🤪</div>,
    content: (
      <Box sx={{ py: 1 }}>
        {' '}
        And on Feedback 💬 let us know what you think: Wonderful 🏆 or Poopie 💩?
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LessonFeedback lessonName={'Intro tour'}>
            <Button>Feedback</Button>
          </LessonFeedback>
        </Box>
      </Box>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
]
