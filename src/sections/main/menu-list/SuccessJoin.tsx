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

import { useTranslate } from '@root/src/utils/translateHelper'

import { getButtonSx } from './constants'

type ISuccessJoinProps = {
  title?: string
  name?: string
  icon?: string
  handleCloseModal: () => void
}

export default function SuccessJoin({ title, name, icon, handleCloseModal }: ISuccessJoinProps) {
  const theme = useTheme()
  const translate = useTranslate()

  const buttonSx = useMemo(() => getButtonSx(theme), [theme])
  return (
    <>
      <DialogTitle
        variant='h3'
        textAlign='center'
      >
        {translate('messages_success')}
        <Typography
          textAlign='center'
          variant='body1'
          maxWidth={500}
        >
          {translate('added_to_tribe')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack>
          <Typography sx={HEADER_EMOJI_SX}>🎉</Typography>
          <Stack sx={MAIN_TEXT_SX}>
            <Avatar
              src={icon}
              alt='name'
              sx={{ width: '35px', height: '35px' }}
            />
            <Typography variant='body2'>{name}</Typography>
            <Typography variant='h3'>{title}</Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          onClick={handleCloseModal}
          sx={buttonSx}
        >
          {translate('added_to_tribe_success')}
        </LoadingButton>
      </DialogActions>
    </>
  )
}

const HEADER_EMOJI_SX = {
  fontSize: { xs: '35px', sm: '40px', md: '60px', lg: '70px' },
  textAlign: 'center',
  mb: -4,
  zIndex: 4,
}

const MAIN_TEXT_SX = {
  background: '#F0EEEE80',
  px: 6,
  py: 2,
  gap: 1,
  flexDirection: 'row',
  alignItems: 'center',
}
