import { forwardRef, useMemo } from 'react'

import { Box, BoxProps, Link } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'

import { useSelector } from '@root/src/redux/store'

interface LogoProps extends BoxProps {
  disabledLink?: boolean
}

// eslint-disable-next-line react/display-name
export const LogoMin = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref): React.ReactElement | null => {
    const tenant = useSelector((state) => state.tenant)

    const logo = useMemo(() => {
      return (
        <Box
          ref={ref}
          component='div'
          sx={{
            width: 196,
            height: 32,
            display: 'inline-flex',
            ...sx,
          }}
          {...other}
        >
          <Image
            src={tenant.min_logo}
            alt={tenant.name}
            width={45}
            height={33}
          />
        </Box>
      )
    }, [tenant])

    return (
      <Link
        component={NextLink}
        href='/'
        sx={{ display: 'contents' }}
      >
        {logo}
      </Link>
    )
  }
)
