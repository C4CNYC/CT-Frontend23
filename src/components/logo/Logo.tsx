import { forwardRef, useMemo } from 'react'

import { Box, BoxProps, Link } from '@mui/material'
import NextLink from 'next/link'

import { useTenants } from '@/hooks/useTenants'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import {
  HomePageTargetType,
  homePageTargetList,
} from '@root/src/redux/services/enums/administration.enum'

import { Image } from '../image'

export interface LogoProps extends BoxProps {
  disabledLink?: boolean
  isLogoNav?: boolean
}

// eslint-disable-next-line react/display-name
export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, isLogoNav = false, sx, ...other }, ref): React.ReactElement | null => {
    const { isAuthenticated } = useAuthContext()
    const tenant = useTenants()
    const homePageTarget: HomePageTargetType = tenant?.meta?.homepage_target
      ? (tenant.meta.homepage_target as HomePageTargetType)
      : HomePageTargetType.Catalog

    const logo = useMemo(() => {
      return (
        <Box
          ref={ref}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
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
            src={tenant?.logo || ''}
            alt={`tenant${tenant?.slug || 'logo'}`}
            style={{
              maxWidth: '100%',
              maxHeight: '65px',
              objectFit: 'contain',
            }}
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
        href={
          isAuthenticated ? homePageTargetList[homePageTarget] : STUDENT_PATH_DASHBOARD.courses.root
        }
      >
        {logo}
      </Link>
    )
  }
)
