import { useState } from 'react'

// form
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, Stack } from '@mui/material'
import { HiEye } from '@react-icons/all-files/hi/HiEye'
import { HiEyeOff } from '@react-icons/all-files/hi/HiEyeOff'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { useSubmitPasswordMutation } from '@/redux/services/auth'
import { useTranslate } from '@/utils/translateHelper'
import { FormProvider } from '@root/src/components/hook-form/FormProvider'
import { RHFTextField } from '@root/src/components/hook-form/RHFTextField'
import { useSnackbar } from '@root/src/components/snackbar'

import { PATH_AUTH } from '../../routes/paths'
interface FormValuesProps {
  password: string
  confirmPassword: string
}

export default function AuthNewPasswordForm(): React.ReactElement {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [showPassword, setShowPassword] = useState(false)
  const [updatePassword, { isLoading }] = useSubmitPasswordMutation()
  const translate = useTranslate()

  const VerifyPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, translate('required_password_length_8'))
      .required(translate('required_password')),
    confirmPassword: Yup.string()
      .required(translate('required_confirm_password'))
      .oneOf([Yup.ref('password'), null], translate('required_password_match')),
  })

  const defaultValues = {
    password: '',
    confirmPassword: '',
  }

  const methods = useForm({
    resolver: yupResolver(VerifyPasswordSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await updatePassword({
        id: router.query.id as string,
        password: data.password,
      }).unwrap()
      enqueueSnackbar(translate('messages_change_password'))
      router.push(PATH_AUTH.signIn)
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      })
    }
  }

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3}>
        <RHFTextField
          name='password'
          label={translate('password')}
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
          label={translate('actions_confirm_password')}
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
        >
          {translate('actions_update_password')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}
