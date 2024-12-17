import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Divider, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/system'
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight'
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle'
import { MdArrowBackIosNew } from '@react-icons/all-files/md/MdArrowBackIosNew'
import { useGoogleLogin } from '@react-oauth/google'

import { useAuthContext } from '@/auth/useAuthContext'
import { RHFTextField, useSnackbar } from '@/components'
import { Role } from '@/redux/services/enums/role.enum'
import { useTranslate } from '@/utils/translateHelper'

import { styledRegisterInput } from '../styles'

interface Props {
  isValid?: boolean
  isTeacher: boolean
  nextStep: () => void
  resetRoad?: () => void
  goToStep: (s: number) => void
}

export default function SingUp({
  nextStep,
  resetRoad,
  isValid,
  isTeacher,
  goToStep,
}: Props): React.ReactElement {
  const theme = useTheme()
  const translate = useTranslate()

  const { enqueueSnackbar } = useSnackbar()
  const { registerWithGoogle } = useAuthContext()

  const [isLoading, setIsLoading] = useState(false)

  const isRTL = theme.direction === 'rtl'

  const onRegisterWithGoogle = useGoogleLogin({
    onSuccess: async ({ access_token: token }) => {
      setIsLoading(true)
      try {
        const role = isTeacher ? Role.Manager : Role.Student
        await registerWithGoogle(token, role)

        goToStep(2)
      } catch (error: any) {
        enqueueSnackbar(error?.data?.message ?? 'error', { variant: 'error' })
      }
      setIsLoading(false)
    },
  })

  return (
    <>
      {isTeacher && (
        <IconButton
          onClick={resetRoad}
          sx={{ ml: '-30px', mt: '-30px' }}
        >
          <MdArrowBackIosNew />
        </IconButton>
      )}
      <Stack
        direction='row'
        sx={{ ml: { xs: 3, sm: 3, md: 0 }, mt: '40px' }}
      >
        <Typography variant='h3'>{translate('login_sign_up')}</Typography>
        <Typography
          variant='h3'
          sx={{ ml: 1, mb: 3 }}
        >
          😃
        </Typography>
      </Stack>
      <Stack
        sx={{
          mt: 1,
          '& .MuiInputLabel-root': {
            fontSize: '1.1rem',
            color: '#637381',
          },
        }}
      >
        <RHFTextField
          name='email'
          label={translate('email')}
          defaultValue=''
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
          InputLabelProps={{
            style: { marginLeft: isRTL ? '35px' : 0 },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={() => {
                    if (!isValid) return
                    nextStep()
                  }}
                >
                  <FaArrowRight color={isValid ? '#43D4DD' : ''} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Divider
          sx={{ my: 3 }}
          flexItem
        >
          <Typography
            sx={(theme) => ({ color: theme.palette.grey[500], mx: 1 })}
            variant='body1'
          >
            {translate('login_or')}
          </Typography>
        </Divider>
        <LoadingButton
          onClick={() => {
            onRegisterWithGoogle()
          }}
          loading={isLoading}
          sx={(theme) => ({
            color:
              theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.text.primary,
            textTransform: 'none',
            py: 1.5,
            mb: 1,
            gap: 2,
            background: theme.palette.mode === 'light' ? '#efefef' : '',
            fontWeight: 400,
            fontSize: '1.3em',
            '&:hover': {
              color: theme.palette.grey[900],
              background: theme.palette.mode === 'light' ? '' : '#fff',
            },
          })}
        >
          <FcGoogle size='50px' />
          {translate('login_sign_up_with_google')}
        </LoadingButton>
      </Stack>
    </>
  )
}
