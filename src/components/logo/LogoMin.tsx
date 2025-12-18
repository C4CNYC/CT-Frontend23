import { forwardRef, useMemo } from 'react'

import { Box, BoxProps, Link } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'

import { useTenants } from '@/hooks/useTenants'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import {
  HomePageTargetType,
  homePageTargetList,
} from '@root/src/redux/services/enums/administration.enum'

interface LogoProps extends BoxProps {
  disabledLink?: boolean
}

// eslint-disable-next-line react/display-name
export const LogoMin = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref): React.ReactElement | null => {
    const { isAuthenticated } = useAuthContext()
    const tenant = useTenants()
    const homePageTarget: HomePageTargetType = tenant?.meta?.homepage_target
      ? (tenant.meta.homepage_target as HomePageTargetType)
      : HomePageTargetType.Catalog

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
            src={tenant?.min_logo || ''}
            alt={tenant?.slug || 'min_logo'}
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
        href={
          isAuthenticated ? homePageTargetList[homePageTarget] : STUDENT_PATH_DASHBOARD.courses.root
        }
        sx={{ display: 'contents' }}
      >
        {logo}
      </Link>
    )
  }
)
