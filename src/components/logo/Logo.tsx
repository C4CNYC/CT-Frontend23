import { forwardRef, useMemo } from 'react'

import { Box, BoxProps, Link } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'

import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useSelector } from '@root/src/redux/store'

export interface LogoProps extends BoxProps {
  disabledLink?: boolean
}

// eslint-disable-next-line react/display-name
export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref): React.ReactElement | null => {
    const tenant = useSelector((state) => state.tenant)

    const logo = useMemo(() => {
      return (
        <Box
          ref={ref}
          component='div'
          sx={{
            width: 164,
            height: 32,
            display: 'inline-flex',
            margin: '0 auto',
            ...sx,
          }}
          {...other}
        >
          <Image
            src={tenant.logo}
            alt='CodeJika'
            width={164}
            height={33}
          />
        </Box>
      )
    }, [tenant])

    if (disabledLink) {
      return logo
    }

    return (
      <Link
        component={NextLink}
        href={STUDENT_PATH_DASHBOARD.class.root}
        sx={{ display: 'contents' }}
      >
        {logo}
      </Link>
    )
  }
)
