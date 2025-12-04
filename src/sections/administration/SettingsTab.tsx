import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Stack } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider } from '@/components'
import { convertStringToBool } from '@/utils/convertStringToBool'
import { RHFSwitch } from '@root/src/components'
import { useUpdateOrgMutation } from '@root/src/redux/services/manager/super-admin'
import { useTranslate } from '@root/src/utils/translateHelper'

import { FormValuesProps } from './constants'

const SettingsTab = ({
  org,
  handleClose,
}: {
  org: any
  handleClose: () => void
}): React.ReactElement => {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [updateOrg, { isLoading: isUpdating }] = useUpdateOrgMutation()

  const CreateOrgSchema = Yup.object().shape({
    domain: Yup.array().of(Yup.string()),
    meta: Yup.object().shape({
      is_enabled_google_auth: Yup.boolean(),
      is_enabled_powered_by_code_tribe: Yup.boolean(),
      is_enabled_monetization: Yup.boolean(),
      is_enabled_teacher_register_feature: Yup.boolean(),
    }),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateOrgSchema),
    defaultValues: {
      domain: org?.domain?.split(',').filter(Boolean) ?? [],
      meta: {
        is_enabled_google_auth: convertStringToBool(org?.meta?.is_enabled_google_auth),
        is_enabled_powered_by_code_tribe: convertStringToBool(
          org?.meta?.is_enabled_powered_by_code_tribe
        ),
        is_enabled_monetization: convertStringToBool(org?.meta?.is_enabled_monetization),
        is_enabled_teacher_register_feature: convertStringToBool(
          org?.meta?.is_enabled_teacher_register_feature
        ),
      },
    },
  })
  const { formState } = methods

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      let domain = Array.isArray(data.domain) ? data.domain.join(',') : data.domain || ''
      if (org) {
        await updateOrg({
          id: org.id,
          domain,
          meta: {
            ...org?.meta,
            ...data.meta,
          },
        }).unwrap()
        enqueueSnackbar(translate('messages_update_success'))
      }
    } catch (e: any) {
      enqueueSnackbar(e?.data?.message ?? translate('message_error'), { variant: 'error' })
    }
  }

  return (
    <FormProvider
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
      style={{ height: '100%' }}
    >
      <Stack
        justifyContent='space-between'
        height='100%'
      >
        <Stack
          direction='row'
          flexWrap='wrap'
          justifyContent='space-between'
          sx={{ '& > *': { width: '45%' } }}
        >
          <RHFSwitch
            name='meta.is_enabled_google_auth'
            label={translate('Google Auth')}
          />
          <RHFSwitch
            name='meta.is_enabled_powered_by_code_tribe'
            label={translate('"Powered by CodeTribe" message')}
          />
          <RHFSwitch
            name='meta.is_enabled_monetization'
            label={translate('Monetization')}
          />
          <RHFSwitch
            name='meta.is_enabled_teacher_register_feature'
            label={translate('Teacher Registration')}
          />
        </Stack>
      </Stack>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%',
          padding: '15px 25px',
          background: '#F6F9FC',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
          <Button onClick={handleClose}>{translate('actions_close')}</Button>

          <LoadingButton
            type='submit'
            variant='contained'
            loading={isUpdating}
            disabled={formState.isSubmitting || !org}
          >
            {translate('actions_update')}
          </LoadingButton>
        </Stack>
      </div>
    </FormProvider>
  )
}

export default SettingsTab
