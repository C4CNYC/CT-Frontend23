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
import { setSchool as setSchoolRedux } from '@/redux/slices/manager'
import { dispatch } from '@/redux/store'
import RoleBasedGuard from '@root/src/auth/RoleBasedGuard'
import { Role } from '@root/src/redux/services/enums/role.enum'
import { useGetMySchoolsQuery } from '@root/src/redux/services/manager/schools-manager'
import { ISchool } from '@root/src/redux/slices/global'

import { Iconify } from '../iconify'

function SchoolSwitcher() {
  const theme = useTheme()
  const popover = usePopover()
  const { reload } = useRouter()

  const { data, isLoading } = useGetMySchoolsQuery({})

  const [school, setSchool] = useState<ISchool | null>(null)

  const mediaQuery = 'sm'

  const handleSchoolSwitcher = useCallback(
    (newValue: ISchool) => {
      if (!school || school.id === newValue.id) return
      setSchool(newValue)
      localStorage.setItem('x-school-id', newValue.id)
      dispatch(setSchoolRedux(newValue.id))
      popover.onClose()
      reload()
    },
    [popover, school]
  )

  useEffect(() => {
    if (isLoading || !data?.data?.length) return

    const schoolInLocal = localStorage.getItem('x-school-id') || ''
    const schoolLocalData = data.data.find((el) => String(el.id) === schoolInLocal)

    const selectedSchool = schoolLocalData || data.data[0]
    setSchool(selectedSchool)
    localStorage.setItem('x-school-id', selectedSchool.id)
    dispatch(setSchoolRedux(selectedSchool.id))
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
      <RoleBasedGuard roles={[Role.SuperAdmin, Role.Admin, Role.Manager, Role.Owner]}>
        <ButtonBase
          disableRipple
          onClick={popover.onOpen}
          sx={{
            py: 0.5,
            pl: 1,
            pr: 0.5,
            gap: { xs: 0, [mediaQuery]: 1 },
            background: popover.open ? theme.palette.grey[300] : 'initial',
            borderRadius: '10px',
            width: { xs: '80px', [mediaQuery]: '160px' },
          }}
        >
          <Avatar
            alt={school?.name}
            src={school?.avatar ?? '/assets/icons/shool/school-icon.svg'}
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
            {school?.name}
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
                selected={option.id === school?.id}
                onClick={() => handleSchoolSwitcher(option)}
                sx={{ height: 48, gap: 1, borderRadius: '10px' }}
              >
                <Avatar
                  alt={option.name}
                  src={option.avatar ?? '/assets/icons/shool/school-icon.svg'}
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

export default SchoolSwitcher
