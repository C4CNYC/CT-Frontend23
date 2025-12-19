import { useEffect, useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Divider, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { HiEye } from '@react-icons/all-files/hi/HiEye'
import { HiEyeOff } from '@react-icons/all-files/hi/HiEyeOff'
import { useRouter } from 'next/router'

import { RHFTextField } from '@/components'
import { useTranslate } from '@/utils/translateHelper'

import { styledRegisterInput } from '../../styles'
import { SUBMIT_BTN_SX } from '../constants'

interface Props {
  isSubmitting: boolean
  isSubmitSuccessful: boolean
  inviteData?: any
  nextStep: () => void
}

export default function AddTeacher({
  isSubmitting,
  isSubmitSuccessful,
  nextStep,
  inviteData,
}: Props): React.ReactElement {
  const translate = useTranslate()
  const router = useRouter()

  const [showPassword, setShowPassword] = useState<boolean>(false)

  useEffect(() => {
    if (inviteData && isSubmitSuccessful) {
      router.push(inviteData.inviteLink)
    }
    if (isSubmitSuccessful) {
      nextStep()
    }
  }, [isSubmitSuccessful, inviteData])

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
                  {showPassword ? <HiEye /> : <HiEyeOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton
        type='submit'
        loading={isSubmitting}
        sx={SUBMIT_BTN_SX}
      >
        {translate('register_whoopie')}
      </LoadingButton>
    </Stack>
  )
}
