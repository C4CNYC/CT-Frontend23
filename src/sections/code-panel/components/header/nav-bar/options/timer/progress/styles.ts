import { Typography } from '@mui/material'
import { styled, keyframes } from '@mui/system'

const circle = keyframes`
    '0%': { strokeDashoffset: '0px' },
    '100%': { strokeDashoffset: '126.92px' },
`

export const BoxWrapper = styled('div')(({ width, height }: { width: number; height: number }) => ({
  width: `${width}px`,
  height: `${height}px`,
  transform: 'rotate(-90deg) scale(1, -1)',
}))

export const CircleBefore = styled('circle')(
  ({ delay, min, pause }: { delay: number; min: number; pause: boolean }) => ({
    strokeDasharray: '126.92px',
    strokeDashoffset: '126.92px',
    stroke: '#0198ED',
    animationName: `${circle}`,
    animationTimingFunction: 'linear',
    animationDelay: `${delay}ms`,
    animationDuration: `${min * 60}s`,
    animationPlayState: pause ? 'paused' : 'running',
  })
)

export const CircleAfter = styled('circle')({
  stroke: '#eaeaea',
  strokeDasharray: '126.92px',
  strokeDashoffset: '0px',
})

export const MinutesNumber = styled(Typography)(({ fontSize }: { fontSize: number }) => ({
  fontSize: `${fontSize}px`,
  lineHeight: '70px',
  color: '#364954',
}))
