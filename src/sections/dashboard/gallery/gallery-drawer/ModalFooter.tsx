import React from 'react'

import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material'

import { RootState, useSelector } from '@root/src/redux/store'

import { useGalleryContext } from '../context/gallery-context'
import UserAvatar from '../UserAvatar'

export default function ModalFooter(): React.ReactElement {
  const theme = useTheme()
  const { title } = useGalleryContext()

  const userName = useSelector((state: RootState) => state.global.user?.username)

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: 'inherit',
        background: theme.palette.grey[100],
        px: 2,
      }}
    >
      <Stack
        direction='row'
        sx={{ position: 'relative', gap: 1 }}
      >
        <UserAvatar />
        <Typography
          variant='subtitle2'
          sx={{ ml: '67px', color: '#EE467A' }}
          gutterBottom
        >
          {userName}
        </Typography>
      </Stack>
      <Tooltip
        title={
          title.length > 125 ? (
            <Typography
              variant='body2'
              sx={{ p: 1 }}
            >
              {title}
            </Typography>
          ) : (
            ''
          )
        }
      >
        <Typography
          variant='subtitle1'
          sx={{ mb: 1 }}
          textOverflow={'ellipsis'}
          whiteSpace={'nowrap'}
          overflow={'hidden'}
        >
          {title}
        </Typography>
      </Tooltip>
    </Box>
  )
}
