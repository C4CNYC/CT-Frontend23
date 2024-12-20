import { Avatar, Box, Link, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import NextLink from 'next/link'

import { useSettingsContext } from '@/components'
import { IClass } from '@/redux/interfaces/class.interface'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useSetLastActiveTribeMutation } from '@root/src/redux/services/manager/activity-student'

import { TRIBE_LINK_SX, getSignOfActiveLink, getTribeTitleSx } from './constants'

interface Props {
  active: boolean
  classItem: IClass & BaseResponseInterface
}

export default function TribeListItem({ active, classItem }: Props): React.ReactElement {
  const theme = useTheme()
  const { themeLayout } = useSettingsContext()

  const [setLastActiveTribe] = useSetLastActiveTribeMutation()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isNavMini = themeLayout === 'mini' && !isMobile

  const onTribeClick = () => {
    setLastActiveTribe({ class_id: classItem.id })
  }

  return (
    <Tooltip
      placement='right'
      title={isNavMini ? classItem.name : ''}
    >
      <Link
        component={NextLink}
        underline='none'
        onClick={onTribeClick}
        href={STUDENT_PATH_DASHBOARD.class.id(classItem.id)}
        sx={TRIBE_LINK_SX}
      >
        <Box sx={(theme) => ({ ...getSignOfActiveLink(theme, active) })} />
        <Avatar
          variant='rounded'
          src={classItem.avatar ?? ''}
          sx={{
            width: '40px',
            height: '40px',
          }}
        />
        {!isNavMini && (
          <Typography
            sx={(theme) => ({ ...getTribeTitleSx(theme) })}
            variant='body1'
          >
            {classItem.name}
          </Typography>
        )}
      </Link>
    </Tooltip>
  )
}
