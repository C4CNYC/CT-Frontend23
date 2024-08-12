import { Box, Stack } from '@mui/material'
import { useTheme } from '@mui/system'
import { useSelector } from 'react-redux'

import { LogoMin } from '@/components/logo'
import { NavSectionMini } from '@/components/nav-section'
import { Role } from '@/redux/services/enums/role.enum'
import { RootState } from '@/redux/store'
import { hideScrollbarX } from '@/utils/cssStyles'

import { NAV_SIZES } from '../../../theme/consts'

import { menuConfig } from './config-navigation'
import LetsCodeBtn from './LestCodeBtn'
import NavToggleButton from './NavToggleButton'

interface INavMini {
  isManager?: boolean
}

export default function NavMini({ isManager }: INavMini): React.ReactElement {
  const user = useSelector((state: RootState) => state.global.user)
  const theme = useTheme()
  const menu = isManager ? menuConfig[user?.role as Role] : menuConfig[Role.Student]
  const isRTL = theme.direction === 'rtl'

  return (
    <Box
      className='tourMainStep2'
      component='nav'
      sx={{
        flexShrink: { md: 0 },
        width: { md: NAV_SIZES.W_DASHBOARD_MINI },
        bgcolor: theme.palette.mode === 'light' ? '#E6F5FD' : theme.palette.background.paper,
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: isRTL
            ? `calc(100% - ${NAV_SIZES.W_DASHBOARD_MINI + 12}px)`
            : NAV_SIZES.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV_SIZES.W_DASHBOARD_MINI,
          ...(!isRTL && { borderRight: (theme) => `dashed 1px ${theme.palette.divider}` }),
          ...(isRTL && { borderLeft: (theme) => `dashed 1px ${theme.palette.divider}` }),
          ...hideScrollbarX,
        }}
      >
        <LogoMin
          sx={{
            my: 2,
            ...(!isRTL && { ml: 2.6 }),
            ...(isRTL && { mr: 2.6 }),
          }}
        />
        {!isManager ? <LetsCodeBtn isMini /> : null}
        <NavSectionMini data={menu} />
      </Stack>
    </Box>
  )
}
