import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Stack } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { RHFTextField } from '@/components'
import { FormProvider } from '@/components'
import { useUpdateOrgMutation } from '@root/src/redux/services/manager/super-admin'
import { useTranslate } from '@root/src/utils/translateHelper'

import { FormValuesProps } from './constants'

const MetaTab = ({
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
        <Stack gap={2}>
          <RHFTextField
            name='meta.meta_title'
            label={translate('org_meta_title')}
          />
          <RHFTextField
            name='meta.meta_description'
            label={translate('org_meta_description')}
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

export default MetaTab
