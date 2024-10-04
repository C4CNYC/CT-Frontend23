import { useMemo } from 'react'

import { LoadingButton } from '@mui/lab'
import {
  Avatar,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from '@mui/material'
import { Stack } from '@mui/system'

import { Iconify } from '@root/src/components'

import { getButtonSx } from './constants'

type ISuccessJoinProps = {
  title?: string
  name?: string
  icon?: string
  location?: string
  handleCloseModal: () => void
}

export default function SuccessJoin({
  title,
  name,
  icon,
  location,
  handleCloseModal,
}: ISuccessJoinProps) {
  const theme = useTheme()

  const buttonSx = useMemo(() => getButtonSx(theme), [theme])
  return (
    <>
      <DialogTitle
        variant='h3'
        textAlign='center'
      >
        Success
        <Typography
          textAlign='center'
          variant='body1'
          maxWidth={500}
        >
          You have been added to the tribe
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack>
          <Typography
            sx={{
              fontSize: { xs: '35px', sm: '40px', md: '60px', lg: '70px' },
              textAlign: 'center',
              mb: -4,
              zIndex: 4,
            }}
          >
            🎉
          </Typography>
          <Stack sx={{ background: '#F0EEEE80', px: 6, py: 2, gap: 1 }}>
            <Typography variant='h3'>{title}</Typography>
            <Stack direction='row'>
              <Avatar
                src={icon}
                alt='name'
                sx={{ width: '25px', height: '25px' }}
              />
              <Typography variant='body2'>{name}</Typography>
            </Stack>
            <Typography
              variant='body2'
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Iconify
                icon='ion:location-outline'
                width={20}
              />{' '}
              {location}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          onClick={handleCloseModal}
          sx={buttonSx}
        >
          Awesome. Thanks!
        </LoadingButton>
      </DialogActions>
    </>
  )
}
