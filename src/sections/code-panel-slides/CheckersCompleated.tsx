import { type FC } from 'react'

import { DotLottiePlayer, PlayerEvents } from '@dotlottie/react-player'
import { Box } from '@mui/material'

import '@dotlottie/react-player/dist/index.css'
import { useLessonManager } from './LessonManagerContext'

export const CheckersCompleated: FC = () => {
  const { checkersAnimation, checkersAnimationNumber, checkersAnimationNumberSet } =
    useLessonManager()

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 'calc(50% + 200px)',
        height: '300px',
        left: '0',
        width: '100%',
        zIndex: 1000,
      }}
    >
      <DotLottiePlayer
        src={`/assets/code-panel/lotti-animation/anim_${checkersAnimationNumber}.lottie`}
        onEvent={(event: PlayerEvents) => {
          if (event === PlayerEvents.Complete) {
            checkersAnimation.onFalse()
            checkersAnimationNumberSet((checkersAnimationNumber % 6) + 1)
            // } else if (event === PlayerEvents.Ready) {
          }
        }}
        autoplay
      />
    </Box>
  )
}
