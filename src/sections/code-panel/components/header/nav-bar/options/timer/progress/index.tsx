import React, { useEffect } from 'react'

import Box from '@mui/material/Box'

import { BoxWrapper, CircleAfter, CircleBefore, MinutesNumber } from './styles'

interface Props {
  min: number
  pause: boolean
  setFinish?: () => void
  width: number
  height: number
  delay: number
  time?: number
  open?: boolean
  fontSize?: number
}
export const CircularProgressWithLabel = ({
  min,
  pause,
  setFinish,
  width,
  height,
  delay,
  time,
  fontSize = 70,
}: Props) => {
  const [delayAnim, setDelayAnim] = React.useState(0)

  useEffect(() => {
    setDelayAnim(delay - performance.now())
  }, [])

  return (
    <Box
      position='relative'
      display='inline-flex'
    >
      <BoxWrapper
        width={width}
        height={height}
      >
        <svg viewBox='22 22 44 44'>
          <CircleAfter
            cx='44'
            cy='44'
            r='20.2'
            fill='none'
            strokeWidth='4'
          />
          <CircleBefore
            delay={delay}
            min={min}
            pause={pause}
            onAnimationEnd={setFinish}
            cx='44'
            cy='44'
            r='20.2'
            fill='none'
            strokeWidth='3.6'
          />
        </svg>
      </BoxWrapper>
      {time ? (
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position='absolute'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <MinutesNumber
            variant='body1'
            fontSize={fontSize}
          >
            {time}
          </MinutesNumber>
        </Box>
      ) : null}
    </Box>
  )
}
