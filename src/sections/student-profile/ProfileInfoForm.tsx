import { useCallback } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Card, Grid, Stack } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { useSnackbar } from 'notistack'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { countries } from '@/assets/data'
import { IUser } from '@/redux/interfaces/auth.interface'
import { APIError } from '@/redux/interfaces/custom-error.interface'
import {
  useUdpateStudentProfileAvatarMutation,
  useUpdateStudentProfileMutation,
} from '@/redux/services/auth'
import { useTranslate } from '@/utils/translateHelper'
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '@root/src/components'

const UpdateUserSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  about: Yup.string(),
  phone: Yup.string(),
  postcode: Yup.string(),
  cover: Yup.string(),
})

interface FormValuesProps {
  firstName: string
  lastName: string
  address: string
  about: string
  phone: string
  postcode: string
  country: string
  cover: string
  photoURL: File | null
}

interface IProfileInfoFormProps {
  data: IUser
}

export default function ProfileInfoForm({
  data,
}: IProfileInfoFormProps): React.ReactElement | null {
  const {
    username,
    student_profile: {
      first_name: firstName,
      last_name: lastName,
      post_code: postcode,
      about,
      phone,
      country,
    },
  } = data
  const cover = !data.cover ? '#5be49b' : data.cover
  const { enqueueSnackbar } = useSnackbar()
  const [updateStudent, { isLoading }] = useUpdateStudentProfileMutation()
  const [updateStudentAvatar] = useUdpateStudentProfileAvatarMutation()
  const defaultValues = {
    username: username ?? '',
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    about: about ?? '',
    phone: phone ?? '',
    postcode: postcode ?? '',
    country: country ?? undefined,
    cover,
  }
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  })
  const translate = useTranslate()

  const { setValue, handleSubmit, control } = methods
  const onSubmit = async (formData: FormValuesProps): Promise<void> => {
    try {
      await updateStudent({
        about: formData.about,
        phone: formData.phone,
        first_name: formData.firstName,
        last_name: formData.lastName,
        post_code: formData.postcode,
        country: formData.country ? formData.country : undefined,
        cover: formData.cover,
      }).unwrap()
      if (formData.photoURL) {
        const file = new FormData()
        file.append('file', formData.photoURL)
        updateStudentAvatar({ file }).unwrap()
      }
      enqueueSnackbar(translate('messages_update_success'))
    } catch (error: any) {
      const typedError = error as APIError
      enqueueSnackbar(typedError.data.message, {
        variant: 'error',
      })
    }
  }

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      })

      if (file) {
        setValue('photoURL', newFile, { shouldValidate: true })
      }
    },
    [setValue]
  )

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          sx={{
            flexGrow: 1,
          }}
        >
          <Card sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Stack
              direction='row'
              sx={{
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              }}
            >
              <Stack gap={3}>
                <RHFUploadAvatar
                  name='photoURL'
                  maxSize={200000}
                  onDrop={handleDrop}
                />
                <Controller
                  control={control}
                  name='cover'
                  render={({ field, fieldState }) => (
                    <MuiColorInput
                      {...field}
                      value={field.value}
                      helperText={fieldState.invalid ? translate('messages_invalid_color') : ''}
                      error={fieldState.invalid}
                      isAlphaHidden
                      format='hex'
                    />
                  )}
                />
              </Stack>
              <Stack
                sx={{
                  flexGrow: 1,
                  gap: 3,
                  pl: { sm: 0, md: 4 },

                  pt: { xs: 3, sm: 3, md: 1 },
                }}
              >
                <RHFTextField
                  name='username'
                  label={translate('username')}
                  disabled
                />
                <RHFTextField
                  name='firstName'
                  label={translate('name')}
                />
                <RHFTextField
                  name='lastName'
                  autoComplete='family-name'
                  label={translate('last_name')}
                />
                <RHFSelect
                  native
                  name='country'
                  label={translate('country')}
                >
                  <option value='' />
                  <option
                    key={'US'}
                    value={'us'}
                  >
                    United States
                  </option>
                  {countries
                    .filter((el) => el.code !== 'US')
                    .map((country) => (
                      <option
                        key={country.code}
                        value={country.code.toLowerCase()}
                      >
                        {country.label}
                      </option>
                    ))}
                </RHFSelect>
              </Stack>
            </Stack>
            <Stack sx={{ gap: 3, pt: 3 }}>
              <RHFTextField
                name='postcode'
                label={translate('profile_postcode')}
              />
              <Controller
                name='phone'
                rules={{ validate: matchIsValidTel }}
                render={({ field, fieldState }) => (
                  <MuiTelInput
                    {...field}
                    helperText={fieldState.invalid ? translate('messages_invalid_phone') : ''}
                    error={fieldState.invalid}
                    placeholder={translate('mobile_number')}
                  />
                )}
              />
              <RHFTextField
                name='about'
                label={translate('about')}
                multiline
                rows={5}
              />
            </Stack>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={isLoading}
              sx={{ alignSelf: 'flex-end', mt: 5 }}
            >
              {translate('actions_save')}
            </LoadingButton>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
