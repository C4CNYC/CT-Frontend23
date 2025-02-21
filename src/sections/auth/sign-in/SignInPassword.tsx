import { useEffect, useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/system'
import { HiEye } from '@react-icons/all-files/hi/HiEye'
import { HiEyeOff } from '@react-icons/all-files/hi/HiEyeOff'
import { MdArrowBackIosNew } from '@react-icons/all-files/md/MdArrowBackIosNew'
import NextLink from 'next/link'
import { StepWizardChildProps } from 'react-step-wizard'

import { RHFTextField } from '@/components'
import { PATH_AUTH } from '@/routes/paths'
import { styledRegisterInput } from '@/sections/on-boarding-register/styles'
import { useTranslate } from '@/utils/translateHelper'

import { RESER_PASS_SX, TYPO_CONT_SX, SINGIN_BTN_SX } from './constants'
interface Props {
  isSubmiting: boolean
  isError: string
}

export default function SingInPassword({
  previousStep,
  nextStep,
  isActive,
  isSubmiting,
  isError,
  currentStep,
}: Partial<StepWizardChildProps> & Props): React.ReactElement {
  const theme = useTheme()
  const translate = useTranslate()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isDisabledBtn, setIsDisabletBtn] = useState<boolean>(true)

  if (isError) {
    if (nextStep) {
      nextStep()
    }
  }

  useEffect(() => {
    if (currentStep === 2) {
      setIsDisabletBtn(false)
    }
  }, [currentStep])

  return (
    <>
      <IconButton
        onClick={() => {
          if (previousStep) {
            previousStep()
          }
        }}
        sx={{ ml: '-30px', mt: '-30px' }}
      >
        <MdArrowBackIosNew />
      </IconButton>
      <Stack
        direction='row'
        sx={TYPO_CONT_SX}
      >
        <Typography variant='h3'>{translate('login_with_email')}</Typography>
        <Typography
          variant='h2'
          sx={{ ml: 1 }}
        >
          ✉️
        </Typography>
      </Stack>

      <Stack sx={{ mt: 2 }}>
        <RHFTextField
          name='password'
          label={translate('password')}
          type={showPassword ? 'text' : 'password'}
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
          inputRef={(input) => input && isActive && input.focus()}
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
        <Link
          component={NextLink}
          href={PATH_AUTH.resetPassword}
          sx={RESER_PASS_SX}
        >
          {translate('login_reset_password')}
        </Link>
        <LoadingButton
          type='submit'
          disabled={isDisabledBtn}
          loading={isSubmiting}
          sx={SINGIN_BTN_SX}
        >
          {translate('login_lets_go')}
        </LoadingButton>
      </Stack>
    </>
  )
}
