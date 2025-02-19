import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'

import { Iconify } from '@/components/iconify'
import { Logo } from '@/components/logo'
import { useSettingsContext } from '@/components/settings'
import ThemeSwitcher from '@/components/theme-switcher'
import { useOffSetTop } from '@/hooks/useOffSetTop'
import { useResponsive } from '@/hooks/useResponsive'
import { useSelector } from '@/redux/store'
import { bgBlur } from '@/utils/cssStyles'
import SchoolSwitcher from '@root/src/components/school-switcher'

import Menu from '../../../sections/code-panel/components/header/nav-bar/options/menu'
import { HEADER_SIZES, NAV_SIZES } from '../../../theme/consts'

import AccountPopover from './AccountPopover'
import LanguagePopover from './LanguagePopover'
import NavAccount from './SchoolAccount'

interface Props {
  onOpenNav?: VoidFunction
}

export default function Header({ onOpenNav }: Props): React.ReactElement | null {
  const theme = useTheme()
  const router = useRouter()
  const user = useSelector((state) => state.global.user)

  const { themeLayout, themeMode } = useSettingsContext()

  const isNavHorizontal = themeLayout === 'horizontal'

  const isNavMini = themeLayout === 'mini'

  const isDesktop = useResponsive('up', 'md')

  const isSchoolSection = router.pathname.includes('dashboard/school')

  const isOffset = useOffSetTop(HEADER_SIZES.H_DASHBOARD_DESKTOP) && !isNavHorizontal

  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!isDesktop && (
        <IconButton
          onClick={onOpenNav}
          sx={{ mr: 1, color: 'text.primary' }}
        >
          <Iconify icon='eva:menu-2-fill' />
        </IconButton>
      )}

      {isSchoolSection ? <NavAccount /> : null}
      <Typography
        variant='h4'
        sx={{
          color: themeMode === 'light' ? 'rgba(54, 73, 84, 1)' : 'auto',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}
      >
        Hey {user?.first_name ? user.first_name : 'Friend'}
        <Typography variant='h4'>👋</Typography>
      </Typography>
      <Stack
        flexGrow={1}
        direction='row'
        alignItems='center'
        justifyContent='flex-end'
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        <SchoolSwitcher />
        <ThemeSwitcher />
        <LanguagePopover />
        {user ? <AccountPopover /> : <Menu />}
      </Stack>
    </>
  )

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER_SIZES.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV_SIZES.W_DASHBOARD + 1}px)`,
          height: HEADER_SIZES.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER_SIZES.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER_SIZES.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV_SIZES.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { md: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  )
}
