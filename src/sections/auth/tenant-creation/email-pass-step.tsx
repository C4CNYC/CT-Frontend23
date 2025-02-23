import { useState } from 'react'

import { IconButton, InputAdornment, Stack } from '@mui/material'
import { HiEye } from '@react-icons/all-files/hi/HiEye'
import { HiEyeOff } from '@react-icons/all-files/hi/HiEyeOff'

import { RHFTextField } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import CustomLabel from './_components/CustomLabel'
import NextBtn from './_components/NextBtn'
import { styledRegisterInput } from './constants'
import { useStepperContext } from './stepper-context'

const EmailPassStep = () => {
  const { handleValidation, isError } = useStepperContext()
  const translate = useTranslate()

  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <Stack sx={{ gap: 3 }}>
      <CustomLabel translationKey='Create a tenant' />
      <RHFTextField
        name='email'
        label={translate('email')}
        sx={(theme) => ({ ...styledRegisterInput(theme) })}
      />
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
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isError) {
            handleValidation()
          }
        }}
      />
      <NextBtn
        onClick={handleValidation}
        disabled={isError}
      />
    </Stack>
  )
}

export default EmailPassStep
