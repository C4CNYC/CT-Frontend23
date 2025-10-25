import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Stack } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider } from '@/components'
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
    meta: Yup.object().shape({
      meta_title: Yup.string(),
      meta_description: Yup.string(),
    }),
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateOrgSchema),
    defaultValues: {
      meta: org?.meta ?? {},
    },
  })
  const { formState } = methods

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      let domain = Array.isArray(data.domain) ? data.domain.join(',') : data.domain || ''
      if (org) {
        await updateOrg({ id: org.id, ...data, domain }).unwrap()
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
        </Stack>
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: 2,
          paddingTop: 4,
          paddingBottom: 4,
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
    </FormProvider>
  )
}

export default SettingsTab
