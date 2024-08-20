import { FC } from 'react'

import { Avatar, Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { CgClose } from '@react-icons/all-files/cg/CgClose'

import { FocusModeIcon } from './FocusModeIcon'
import {
  OVERLAY_AVATAR_SX,
  OVERLAY_GROUP_TITLE_SX,
  OVERLAY_WRAPPER_SX,
  TRIBE_NAME_STYLES,
} from './styles'

interface IProps {
  title: string
  resetRoom: () => void
  avatar?: string
}

const FocusOverlay: FC<IProps> = ({ title, resetRoom, avatar }) => {
  return (
    <Tooltip
      placement='left'
      title={
        <Typography>
          <b>Teleport</b> to see the full editor, preview and slides of this person.
        </Typography>
      }
    >
      <Box sx={OVERLAY_WRAPPER_SX}>
        <Avatar
          alt='avatar'
          src={avatar}
          sx={OVERLAY_AVATAR_SX}
        >
          🤖
        </Avatar>
        <IconButton sx={{ p: 0 }}>
          <FocusModeIcon
            widht={25}
            height={16}
            color='#FFF'
          />
        </IconButton>

        <Stack sx={{ pr: 4, width: '193px' }}>
          <Typography
            variant='caption'
            sx={OVERLAY_GROUP_TITLE_SX}
          >
            teleport mode
          </Typography>

          <Typography
            variant='subtitle2'
            sx={{ ...TRIBE_NAME_STYLES, color: '#fff' }}
          >
            {title}
          </Typography>
        </Stack>
        <IconButton
          sx={{ p: 0 }}
          onClick={resetRoom}
        >
          <CgClose
            size={28}
            color='#fff'
          />
        </IconButton>
      </Box>
    </Tooltip>
  )
}

export default FocusOverlay
