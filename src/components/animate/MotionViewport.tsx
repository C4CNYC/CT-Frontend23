// hooks
import { Box, BoxProps } from '@mui/material'
import { MotionProps, m } from 'framer-motion'

import { useResponsive } from '@/lib/hooks'

import { varContainer } from './variants'

type IProps = BoxProps & MotionProps

interface Props extends IProps {
  children: React.ReactNode
  disableAnimatedMobile?: boolean
}

export function MotionViewport({
  children,
  disableAnimatedMobile = true,
  ...other
}: Props): React.ReactElement | null {
  const isMobile = useResponsive('down', 'sm')

  if (isMobile && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>
  }

  return (
    <Box
      component={m.div}
      initial='initial'
      whileInView='animate'
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  )
}
