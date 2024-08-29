import { useEffect, useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Chip, Divider, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { MdDone } from '@react-icons/all-files/md/MdDone'

import { Iconify, RHFTextField } from '@/components'
import { useTranslate } from '@/utils/translateHelper'

import { styledRegisterInput } from '../styles'

interface Props {
  nextStep: () => void
  isSubmiting: boolean
  isSubmitSuccessful: boolean
  hasSixDigit: boolean
  hasOneNumber: boolean
}

export default function StepperRegister({
  nextStep,
  isSubmiting,
  isSubmitSuccessful,
  hasOneNumber,
  hasSixDigit,
}: Props): React.ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const translate = useTranslate()

  useEffect(() => {
    if (isSubmitSuccessful) {
      nextStep()
    }
  }, [isSubmitSuccessful])

  return (
    <>
      <Stack
        direction='row'
        sx={{ ml: { xs: 3, sm: 3, md: 0 }, mt: 1 }}
      >
        <Typography variant='h3'>{translate('register')}</Typography>
      </Stack>
      <Typography
        variant='body1'
        sx={{ pb: 2, ml: { xs: 3, sm: 3, md: 0 } }}
      >
        {translate('register_name_on_certificate')}
      </Typography>
      <Stack gap={2}>
        <RHFTextField
          name='firstName'
          label={translate('first_name')}
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
        />
        <RHFTextField
          name='lastName'
          label={translate('surname')}
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
        />
        <Divider />
        <RHFTextField
          name='password'
          label={translate('password')}
          type={showPassword ? 'text' : 'password'}
          error={false}
          sx={{
            ...(theme) => ({ ...styledRegisterInput(theme) }),
            '& .MuiFormHelperText-root': {
              display: 'none',
            },
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
      <Stack
        direction='row'
        justifyContent='center'
        pt={1}
        gap={1}
      >
        <Chip
          label='1 Number'
          icon={hasOneNumber ? <MdDone /> : <></>}
          color={hasOneNumber ? 'success' : 'default'}
        />
        <Chip
          label='8+ Characters'
          icon={hasSixDigit ? <MdDone /> : <></>}
          color={hasSixDigit ? 'success' : 'default'}
        />
      </Stack>
      <LoadingButton
        type='submit'
        loading={isSubmiting}
        sx={{
          background: '#43D4DD33',
          color: '#43D4DD',
          fontSize: '1.5rem',
          mt: 2,
          width: '100%',
          '&:hover': {
            background: '#fff',
          },
        }}
      >
        {translate('register_whoopie')}
      </LoadingButton>
    </>
  )
}
