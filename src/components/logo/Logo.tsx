import { forwardRef, useMemo } from 'react'

import { Box, BoxProps, Link } from '@mui/material'
import NextLink from 'next/link'

import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useSelector } from '@root/src/redux/store'

import { Image } from '../image'

export interface LogoProps extends BoxProps {
  disabledLink?: boolean
  isLogoNav?: boolean
}

// eslint-disable-next-line react/display-name
export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, isLogoNav = false, sx, ...other }, ref): React.ReactElement | null => {
    const tenant = useSelector((state) => state.tenant)

    const logo = useMemo(() => {
      return (
        <Box
          ref={ref}
          sx={{
            display: 'inline-flex',
            margin: '0 auto',
            width: '100%',
            maxWidth: '200px',
            height: 'auto',
            maxHeight: isLogoNav ? '40px' : '120px',
            ...sx,
          }}
          {...other}
        >
          <Image
            src={tenant.logo}
            alt={`tenant${tenant.slug}`}
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
        href={STUDENT_PATH_DASHBOARD.courses.root}
      >
        {logo}
      </Link>
    )
  }
)
