import { forwardRef } from 'react'

import { Box, BoxProps, Link, useTheme } from '@mui/material'
import NextLink from 'next/link'

import useIsDesktop from '@/hooks/useIsDesktop'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'

import { icon } from './icon'

export interface LogoProps extends BoxProps {
  disabledLink?: boolean
}

// eslint-disable-next-line react/display-name
const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref): React.ReactElement | null => {
    const theme = useTheme()
    const logo = (
      <Box
        ref={ref}
        component='div'
        sx={{
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        {icon(theme.palette.mode === 'light')}{' '}
      </Box>
    )

    const isDesktop = useIsDesktop()
    if (!isDesktop) return null

    if (disabledLink) {
      return logo
    }

    return (
      <Link
        component={NextLink}
        href={STUDENT_PATH_DASHBOARD.class.root}
        sx={LINK_SX}
      >
        {logo}
      </Link>
    )
  }
)

const LINK_SX = { display: 'contents' }

export default Logo
