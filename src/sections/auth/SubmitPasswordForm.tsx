import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { HiEye } from '@react-icons/all-files/hi/HiEye'
import { HiEyeOff } from '@react-icons/all-files/hi/HiEyeOff'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { useResetPasswordUserQuery, useSubmitPasswordMutation } from '@/redux/services/auth'

import { FormProvider, RHFTextField } from '../../components/hook-form'
import { useSnackbar } from '../../components/snackbar'
import { PATH_AUTH } from '../../routes/paths'
interface FormValuesProps {
  password: string
  confirmPassword: string
}

export default function SubmitPasswordForm() {
  const { push, query } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [showPassword, setShowPassword] = useState(false)
  const [submitPassword, { isLoading, isError }] = useSubmitPasswordMutation()
  const {
    isLoading: urpuqIsLoading,
    isError: urpuqIsError,
    data: user,
  } = useResetPasswordUserQuery((query.id as string) || '', { skip: !query.id })
  const VerifyCodeSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  })

  const defaultValues = {
    password: '',
    confirmPassword: '',
  }

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = async (data: FormValuesProps) => {
    try {
      submitPassword({
        id: query.id as string,
        password: data.password,
      }).then((data) => {
        if ('error' in data) {
          enqueueSnackbar('Password change error', { variant: 'error' })
          if ((data?.error as any)?.data?.message) {
            let errorMessage = (data?.error as any).data.message
            setTimeout(() => {
              if (errorMessage == 'reset id invalid') {
                enqueueSnackbar('You have used wrong link', { variant: 'error' })
              } else {
                enqueueSnackbar(errorMessage as string, { variant: 'error' })
              }
            }, 500)
          }
          return
        }
        enqueueSnackbar('Password changed successfully', { variant: 'success' })
        push(PATH_AUTH.signIn)
      })
    } catch (error: any) {
      enqueueSnackbar(error.data.message, { variant: 'error' })
    }
  }

  if (urpuqIsLoading) {
    return <div>Loading...</div>
  }
  if (urpuqIsError) {
    return (
      <div>
        Error loading user data.
        <br />
        <Typography
          variant='h4'
          sx={{ mb: 2, textAlign: 'center' }}
        >
          Make sure you have a valid reset link.
        </Typography>
        <br />
        You can try to reset your password again by clicking the button below.
        <br />
        <LoadingButton
          fullWidth
          size='large'
          variant='contained'
          loading={false}
          onClick={() => push(PATH_AUTH.resetPassword)}
          sx={{
            mt: 3,
            borderRadius: '100px',
            background: '#02D3D7',
            '&:hover': {
              background: '#fff',
              boxShadow: '0px 8px 16px rgba(2, 211, 215, 0.24)',
              color: '#02D3D7',
              border: '1px solid #02D3D7',
            },
          }}
        >
          Go to reset password
        </LoadingButton>
        <br />
      </div>
    )
  }

  return (
    <>
      <Typography
        variant='h4'
        sx={{ mb: 2, textAlign: 'center' }}
      >
        Hi {user?.first_name}
      </Typography>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={3}>
          <h1>Pick your new password:</h1>
          <RHFTextField
            name='password'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => {
                      setShowPassword(!showPassword)
                    }}
                    edge='end'
                  >
                    {showPassword ? <HiEye /> : <HiEyeOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name='confirmPassword'
            label='Confirm New Password'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => {
                      setShowPassword(!showPassword)
                    }}
                    edge='end'
                  >
                    {showPassword ? <HiEye /> : <HiEyeOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            loading={isLoading}
            sx={{
              mt: 3,
              borderRadius: '100px',
              background: '#02D3D7',
              '&:hover': {
                background: '#fff',
                boxShadow: '0px 8px 16px rgba(2, 211, 215, 0.24)',
                color: '#02D3D7',
                border: '1px solid #02D3D7',
              },
            }}
          >
            Update Password
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  )
}
