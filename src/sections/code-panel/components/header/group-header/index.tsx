import { type FC } from 'react'

import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material'

import PersonIcon from '@/assets/icons/PersonIcon'
import useIsDesktop from '@/hooks/useIsDesktop'
import { useSelector } from '@/redux/store'
import { useTranslate } from '@root/src/utils/translateHelper'

import {
  AVATAR_STYLES,
  GROUP_TITLE_STYLES,
  STACK_GROUP_STYLES,
  STACK_STYLES,
  TRIBE_NAME_STYLES,
} from './styles'

const MAX_TRIBE_NAME_LENGTH = 20

const GroupHeader: FC = () => {
  const translate = useTranslate()
  const isDesktop = useIsDesktop()

  const tribe = useSelector((state) => state.codePanel.class)

  const groupTitle =
    tribe && tribe.name.length > MAX_TRIBE_NAME_LENGTH ? (
      <Typography variant='subtitle2'>{tribe.name}</Typography>
    ) : (
      ''
    )

  if (!isDesktop) {
    return null
  }

  return (
    <Stack sx={STACK_STYLES}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt='avatar'
          src={tribe?.avatar ?? ''}
          sx={AVATAR_STYLES}
        >
          🤖
        </Avatar>

        <Stack sx={STACK_GROUP_STYLES}>
          <Typography
            variant='body2'
            sx={GROUP_TITLE_STYLES}
          >
            {translate('code_panel_header_group')}
          </Typography>

          <Stack>
            <Tooltip title={groupTitle}>
              <Typography
                variant='subtitle2'
                sx={TRIBE_NAME_STYLES}
              >
                {tribe?.name}
              </Typography>
            </Tooltip>
          </Stack>
        </Stack>
        <PersonIcon
          display='flex'
          justifyContent='center'
          alignItems='center'
        />
      </Box>
    </Stack>
  )
}

export default GroupHeader
