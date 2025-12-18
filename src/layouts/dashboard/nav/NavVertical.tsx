import { useEffect } from 'react'

import { Box, Drawer, Stack } from '@mui/material'
import { useTheme } from '@mui/system'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { Logo } from '@/components/logo'
import { NavSectionVertical } from '@/components/nav-section'
import { Scrollbar } from '@/components/scrollbar'
import { useResponsive } from '@/hooks'
import { Role } from '@/redux/services/enums/role.enum'
import { RootState } from '@/redux/store'
import { useTenants } from '@root/src/hooks/useTenants'
import { useIsAdmin } from '@root/src/lib/use-is-admin'

import { NAV_SIZES } from '../../../theme/consts'

import { menuConfig, filterMenu } from './config-navigation'
import LetsCodeBtn from './LestCodeBtn'
import NavToggleButton from './NavToggleButton'

interface INavVertical {
  openNav: boolean
  isManager?: boolean
  onCloseNav: VoidFunction
}

export default function NavVertical({
  openNav,
  isManager,
  onCloseNav,
}: INavVertical): React.ReactElement | null {
  const tenant = useTenants()
  const theme = useTheme()
  const { pathname } = useRouter()

  const user = useSelector((state: RootState) => state.global.user)
  const isAdmin = useIsAdmin()
  const isDesktop = useResponsive('up', 'md')

  const rawMenu = isManager
    ? menuConfig(user?.role as Role)[user?.role as Role]
    : menuConfig(user?.role as Role)[Role.Student]

  const menu = filterMenu(rawMenu, { tenant, user, role: user?.role as Role })

  useEffect(() => {
    if (openNav) {
      onCloseNav()
    }
  }, [pathname])

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <>
        <Stack
          sx={{
            pt: 3,
            pb: 2,
            px: 1,
            flexShrink: 0,
          }}
        >
          <Logo
            sx={{ ml: 2 }}
            isLogoNav
          />
          {!isManager && !isAdmin ? <LetsCodeBtn /> : null}
        </Stack>

        <NavSectionVertical data={menu} />
      </>
    </Scrollbar>
  )

  return (
    <Box
      component='nav'
      sx={{
        flexShrink: { md: 0 },
        width: { md: NAV_SIZES.W_DASHBOARD },
        bgcolor: theme.palette.mode === 'light' ? '#E6F5FD' : theme.palette.background.paper,
      }}
    >
      <NavToggleButton />

      {isDesktop ? (
        <Drawer
          anchor={'left'}
          open
          variant='permanent'
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV_SIZES.W_DASHBOARD,
              bgcolor: 'transparent',
              borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV_SIZES.W_DASHBOARD,
              bgcolor: theme.palette.mode === 'light' ? '#E6F5FD' : theme.palette.background.paper,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  )
}
