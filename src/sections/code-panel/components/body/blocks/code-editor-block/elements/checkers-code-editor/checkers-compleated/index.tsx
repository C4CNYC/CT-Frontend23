import { type FC } from 'react'

import { DotLottiePlayer, PlayerEvents } from '@dotlottie/react-player'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'

import { setIsActivateCompeated } from '@/redux/slices/checkers-animation'
import {
  increaceAnimationNumber,
  resetAnimaitonNumber,
} from '@root/src/redux/slices/code-panel-global'
import { useSelector } from '@root/src/redux/store'
import '@dotlottie/react-player/dist/index.css'

const CheckersCompleated: FC = () => {
  const dispatch = useDispatch()
  const animationNumber = useSelector((state) => state.codePanelGlobal.animationNumber)
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
        src={`/assets/code-panel/lotti-animation/anim_${animationNumber}.lottie`}
        onEvent={(event: PlayerEvents) => {
          if (event === PlayerEvents.Complete) {
            dispatch(setIsActivateCompeated(false))
          }
          if (event === PlayerEvents.Ready) {
            if (animationNumber < 7) {
              dispatch(increaceAnimationNumber(animationNumber + 1))
            } else {
              dispatch(resetAnimaitonNumber())
            }
          }
        }}
        autoplay
      />
    </Box>
  )
}

export default CheckersCompleated
