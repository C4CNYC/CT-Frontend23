import { useState } from 'react'

import { Box, Divider, MenuItem, Skeleton, Stack, Tooltip, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useSelector } from '@/redux/store'

import RoleBasedGuard from '@/auth/RoleBasedGuard'
import { useAuthContext } from '@/auth/useAuthContext'
import { IconButtonAnimate } from '@/components/animate'
import { CustomAvatar } from '@/components/custom-avatar'
import { MenuPopover } from '@/components/menu-popover'
import { useSnackbar } from '@/components/snackbar'
import { Role } from '@/redux/services/enums/role.enum'
import { setStudentMode } from '@/redux/slices/global'
import { MANAGER_PATH_DASHBOARD, MANAGER_PATH_PAGE } from '@/routes/manager.paths'
import { PATH_AUTH } from '@/routes/paths'
import { STUDENT_PATH_PAGE } from '@/routes/student.paths'
import { useTranslate } from '@/utils/translateHelper'

export default function AccountPopover(): React.ReactElement {
  const reduxDispatch = useDispatch()
  const { pathname } = useRouter()
  const isStudentMode = /\/student/.test(pathname)
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const { logout } = useAuthContext()
  const { replace, push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()
  const profile = useSelector((state) => state.global.user)

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget)
  }

  const handleLogout = (): void => {
    try {
      logout()
      void replace(PATH_AUTH.signIn)
      setOpenPopover(null)
    } catch (error: any) {
      enqueueSnackbar(translate('messages_unable_to_logout'), {
        variant: 'error',
      })
    }
  }

  const handleClickItem = (path: string): void => {
    setOpenPopover(null)
    push(path)
  }

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar
          src={profile?.avatar}
          alt={profile?.first_name}
          name={profile?.first_name}
        />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={() => {
          setOpenPopover(null)
        }}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {(
            <Typography
              variant='subtitle2'
              noWrap
            >
              { profile ? `${profile.first_name} ${profile.last_name}` : `Anonymous User` }
            </Typography>
          ) }
          {(
            <Tooltip
              title={
                profile?.email && profile?.email.length > 21 ? (
                  <Typography variant='body2'>{profile?.email}</Typography>
                ) : (
                  ''
                )
              }
            >
              <Typography
                variant='body2'
                sx={{ color: 'text.secondary' }}
                noWrap
              >
                {profile?.email}
              </Typography>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem
            onClick={() => {
              handleClickItem(STUDENT_PATH_PAGE.profile)
            }}
          >
            {translate('profile')}
          </MenuItem>
        </Stack>

        <RoleBasedGuard roles={[Role.Owner, Role.Admin, Role.Manager]}>
          <Stack sx={{ p: 1 }}>
            <MenuItem
              onClick={() => {
                handleClickItem(isStudentMode ? MANAGER_PATH_PAGE.home : STUDENT_PATH_PAGE.home)
                reduxDispatch(setStudentMode(!isStudentMode))
              }}
            >
              {isStudentMode ? translate('manager_account') : translate('student_account')}
            </MenuItem>
          </Stack>
        </RoleBasedGuard>

        <RoleBasedGuard roles={[Role.Owner]}>
          <Stack sx={{ p: 1 }}>
            <MenuItem
              onClick={() => {
                handleClickItem(MANAGER_PATH_DASHBOARD.organization.general)
              }}
            >
              {translate('organization_setting')}
            </MenuItem>
          </Stack>
        </RoleBasedGuard>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1 }}
        >
          {translate('logout')}
        </MenuItem>
      </MenuPopover>
    </>
  )
}
