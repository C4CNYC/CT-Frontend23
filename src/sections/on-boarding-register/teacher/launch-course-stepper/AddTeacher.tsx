import { useEffect, useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Divider, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/system'

import { Iconify, RHFTextField } from '@/components'
import { useTranslate } from '@/utils/translateHelper'

import { styledRegisterInput } from '../../styles'
import { SUBMIT_BTN_SX } from '../constants'

interface Props {
  isSubmiting: boolean
  isSubmitSuccessful: boolean
  nextStep: () => void
}

export default function AddTeacher({
  isSubmiting,
  isSubmitSuccessful,
  nextStep,
}: Props): React.ReactElement {
  const theme = useTheme()
  const translate = useTranslate()

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const isRTL = theme.direction === 'rtl'

  useEffect(() => {
    if (isSubmitSuccessful) {
      nextStep()
    }
  }, [isSubmitSuccessful])

  return (
    <Stack minHeight={450}>
      <Stack
        direction='row'
        sx={{ ml: { xs: 3, sm: 3, md: 0 }, mt: 3 }}
      >
        <Typography variant='h3'>{translate('register_as_teacher')}</Typography>
      </Stack>
      <Typography
        variant='body1'
        sx={{ ml: { xs: 3, sm: 3, md: 0 }, mb: 4 }}
      >
        {translate('register_get_ready')}
      </Typography>
      <Stack gap={2}>
        <RHFTextField
          name='firstName'
          label={translate('first_name')}
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
        />
        <RHFTextField
          name='lastName'
          autoComplete='family-name'
          label={translate('surname')}
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
        />
        <Divider sx={{ my: 1 }} />

        <RHFTextField
          name='password'
          label={translate('password')}
          type={showPassword ? 'text' : 'password'}
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
          InputLabelProps={{
            style: { marginLeft: isRTL ? '35px' : 0 },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword)
                  }}
                  edge='end'
                  sx={{ color: '#02D3D7' }}
                >
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton
        type='submit'
        loading={isSubmiting}
        sx={SUBMIT_BTN_SX}
      >
        {translate('register_whoopie')}
      </LoadingButton>
    </Stack>
  )
}
