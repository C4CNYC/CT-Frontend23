import { FC } from 'react'

import { Avatar, Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { CgClose } from '@react-icons/all-files/cg/CgClose'
import { MdFilterCenterFocus } from '@react-icons/all-files/md/MdFilterCenterFocus'

import {
  OVERLAY_AVATAR_SX,
  OVERLAY_GROUP_TITLE_SX,
  OVERLAY_WRAPPER_SX,
  TRIBE_NAME_STYLES,
} from './styles'

interface IProps {
  title: string
  resetRoom: () => void
}

const FocusOverlay: FC<IProps> = ({ title, resetRoom }) => {
  return (
    <Box sx={OVERLAY_WRAPPER_SX}>
      <Avatar
        alt='avatar'
        src={''}
        sx={OVERLAY_AVATAR_SX}
      >
        🤖
      </Avatar>
      <IconButton sx={{ p: 0 }}>
        <MdFilterCenterFocus
          size={25}
          color='#fff'
        />
      </IconButton>

      <Stack sx={{ pr: 4, width: '193px' }}>
        <Typography
          variant='caption'
          sx={OVERLAY_GROUP_TITLE_SX}
        >
          Focus mode
        </Typography>

        <Tooltip title={'groupTitle'}>
          <Typography
            variant='subtitle2'
            sx={{ ...TRIBE_NAME_STYLES, color: '#fff' }}
          >
            {title}
          </Typography>
        </Tooltip>
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
  )
}

export default FocusOverlay
