import { useCallback, useEffect, useState } from 'react'

import {
  Avatar,
  ButtonBase,
  MenuItem,
  MenuList,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material'
import { useRouter } from 'next/router'

import CustomPopover, { usePopover } from '@/components/custom-popover'
import RoleBasedGuard from '@root/src/auth/RoleBasedGuard'
import { Role } from '@root/src/redux/services/enums/role.enum'
import { IAdministration } from '@root/src/redux/services/interfaces/administration'
import { useGetOrgListQuery } from '@root/src/redux/services/manager/super-admin'

import { Iconify } from '../iconify'

function OrgSwitcher() {
  const theme = useTheme()
  const popover = usePopover()
  const { reload } = useRouter()

  const { data, isLoading } = useGetOrgListQuery({})

  const [org, setOrg] = useState<IAdministration | null>(null)

  const mediaQuery = 'sm'

  const handleSchoolSwitcher = useCallback(
    (newValue: IAdministration) => {
      if (!org || org.slug === newValue.slug) return
      setOrg(newValue)
      localStorage.setItem('tenantName', newValue.slug)
      popover.onClose()
      reload()
    },
    [popover, org]
  )

  useEffect(() => {
    if (isLoading || !data?.data?.length) return

    const orgInLocal = localStorage.getItem('tenantName') || ''
    const orgLocalData = data.data.find((el) => String(el.slug) === orgInLocal)

    const selectedOrg = orgLocalData || data.data[0]
    setOrg(selectedOrg)
    localStorage.setItem('tenantName', selectedOrg.slug)
  }, [isLoading, data])

  if (isLoading) {
    return (
      <Skeleton
        variant='rounded'
        width={160}
        height={32}
      />
    )
  }

  return (
    <>
      <RoleBasedGuard roles={[Role.SuperAdmin]}>
        <ButtonBase
          disableRipple
          onClick={popover.onOpen}
          sx={{
            py: 0.5,
            pl: 1,
            pr: 0.5,
            gap: { xs: 0.5, [mediaQuery]: 1 },
            background: popover.open ? theme.palette.grey[300] : 'initial',
            borderRadius: '10px',
            width: { xs: '80px', [mediaQuery]: '160px' },
          }}
        >
          <Avatar
            alt={org?.name}
            src={org?.logo ?? '/assets/icons/home/ic_development.svg'}
            sx={{ width: 24, height: 24, display: { xs: 'none', [mediaQuery]: 'block' } }}
            variant='square'
          />

          <Typography
            variant='subtitle2'
            sx={{
              color: theme.palette.text.primary,
              width: '94px',
            }}
            noWrap
            textOverflow='ellipsis'
          >
            {org?.name}
          </Typography>

          <Iconify
            width={16}
            icon='carbon:chevron-sort'
            sx={{ color: 'text.disabled' }}
          />
        </ButtonBase>

        <CustomPopover
          open={popover.open}
          onClose={popover.onClose}
          arrow='top-center'
          transformOrigin={{
            vertical: -8,
            horizontal: 'center',
          }}
          slotProps={{
            paper: {
              sx: {
                backgroundImage: `url(/assets/core/red-blur.png), url(/assets/core/cyan-blur.png)`,
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundSize: `200px, 200px `,
                backgroundPosition: 'left bottom, top right',
              },
            },
          }}
        >
          <MenuList sx={{ width: 260, p: 0 }}>
            {data?.data.map((option) => (
              <MenuItem
                key={option.id}
                selected={option.id === org?.id}
                onClick={() => handleSchoolSwitcher(option)}
                sx={{ height: 48, gap: 1, borderRadius: '10px' }}
              >
                <Avatar
                  alt={option.name}
                  src={option.logo ?? '/assets/icons/home/ic_development.svg'}
                  sx={{ width: 24, height: 24 }}
                  variant='square'
                />

                <Typography
                  variant='subtitle2'
                  sx={{ flexGrow: 1 }}
                  noWrap
                  textOverflow='ellipsis'
                >
                  {option.name}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
        </CustomPopover>
      </RoleBasedGuard>
    </>
  )
}

export default OrgSwitcher
