import { forwardRef, useMemo } from 'react'

import { Box, BoxProps, Link } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'

import { useSelector } from '@root/src/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

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
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...sx,
          }}
          {...other}
        >
          <Image
            src={tenant.min_logo}
            alt={tenant.slug}
            width={45}
            height={45}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      )
    }, [tenant])

    return (
      <Link
        component={NextLink}
        href={STUDENT_PATH_DASHBOARD.courses.root}
        sx={{ display: 'contents' }}
      >
        {logo}
      </Link>
    )
  }
)
