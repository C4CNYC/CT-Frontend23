import { Typography } from '@mui/material'

import RoleBasedGuard from '@root/src/auth/RoleBasedGuard'
import { useSettingsContext } from '@root/src/components'
import { useResponsive } from '@root/src/hooks'
import { Role } from '@root/src/redux/services/enums/role.enum'
import { useSelector } from '@root/src/redux/store'

const WelcomeText = () => {
  const { themeMode } = useSettingsContext()

  const isMobile = useResponsive('down', 'sm')

  const user = useSelector((state) => state.global.user)

  if (isMobile) {
    return (
      <RoleBasedGuard roles={[...Object.values(Role).filter((role) => role !== Role.SuperAdmin)]}>
        <Typography
          variant='h4'
          sx={{
            color: themeMode === 'light' ? 'rgba(54, 73, 84, 1)' : 'auto',
            display: 'flex',
            gap: 2,
            alignItems: 'center',
          }}
        >
          Hey {user?.first_name ? user.first_name : 'Friend'} 👋
        </Typography>
      </RoleBasedGuard>
    )
  }
  return (
    <Typography
      variant='h4'
      sx={{
        color: themeMode === 'light' ? 'rgba(54, 73, 84, 1)' : 'auto',
        display: 'flex',
        gap: 2,
        alignItems: 'center',
      }}
    >
      Hey {user?.first_name ? user.first_name : 'Friend'} 👋
    </Typography>
  )
}

export default WelcomeText
