import React, { useState, useEffect } from 'react'

import { javascript } from '@codemirror/lang-javascript'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  FormControlLabel,
  Switch,
} from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import RoleBasedGuard from '@/auth/RoleBasedGuard'
import { FormProvider, RHFCode, RHFTextField } from '@/components'
import { ModalCodeFullscreen } from '@/components/modal-code-fullscreen'
import { useIsSuperAdmin } from '@/hooks/useIsSuperAdmin'
import { Role } from '@/redux/services/enums/role.enum'
import {
  useCreateIntegrationMutation,
  useEditIntegrationMutation,
} from '@/redux/services/manager/integration-manager'
import { useTranslate } from '@/utils/translateHelper'

const IntegrationSchema = Yup.object().shape({
  name: Yup.string().required('Integration name is required'),
  public: Yup.boolean(),
})

interface IntegrationForm {
  name: string
  head: string
  scripts: string
  public?: boolean // New field
}

interface Prop {
  id?: string
  defaultValues?: IntegrationForm
  children: React.ReactElement
  isEdit?: boolean
}
// RHFCode
export function ModalIntegration({
  isEdit = false,
  children,
  id,
  defaultValues = {
    name: '',
    scripts: '',
    head: '',
    public: false, // Default to false
  },
}: Prop): React.ReactElement {
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const isSuperAdmin = useIsSuperAdmin()
  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  const [createIntegration, { isLoading: creatLoading }] = useCreateIntegrationMutation()
  const [updateIntegration, { isLoading: updateLoading }] = useEditIntegrationMutation()
  const translate = useTranslate()

  const methods = useForm<IntegrationForm>({
    resolver: yupResolver(IntegrationSchema),
    defaultValues,
  })

  useEffect(() => {
    if (open) {
      methods.reset(defaultValues)
    }
  }, [open])

  const { handleSubmit } = methods

  const onSubmit = async (data: IntegrationForm): Promise<void> => {
    try {
      if (id) {
        await updateIntegration({
          id,
          ...data,
        }).unwrap()
        enqueueSnackbar(translate('integrations_updated_msg'))
      } else {
        await createIntegration(data).unwrap()
        enqueueSnackbar(translate('integrations_created_msg'))
      }
      methods.reset()
      handleClose()
    } catch (e: any) {
      if (e.status === 403) {
        enqueueSnackbar(translate('integrations_permission_denied'), { variant: 'error' })
      } else if (e.status === 404) {
        enqueueSnackbar(translate('integrations_not_found'), { variant: 'error' })
      } else {
        enqueueSnackbar(translate('messages_error'), { variant: 'error' })
      }
    }
  }
  const onCancel = (): void => {
    methods.reset()
    handleClose()
  }

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle sx={{ pb: 2 }}>{translate('integrations_create_int')}</DialogTitle>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <Stack gap={2}>
              <Box>
                <RHFTextField
                  placeholder={translate('name')}
                  name='name'
                />
              </Box>

              <RoleBasedGuard roles={[Role.SuperAdmin]}>
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        {...methods.register('public')}
                        checked={methods.watch('public')}
                        onChange={(e) => methods.setValue('public', e.target.checked)}
                      />
                    }
                    label={translate('integrations_make_public')}
                  />
                </Box>
              </RoleBasedGuard>

              <Box>
                <ModalCodeFullscreen
                  title={translate('integrations_head_links_plh')}
                  name='head'
                />
                <RHFCode
                  placeholder={translate('integrations_head_links_plh')}
                  name='head'
                  height='180px'
                  extensions={[javascript({ jsx: true })]}
                />
              </Box>

              <Box>
                <ModalCodeFullscreen
                  title={translate('integrations_body_links_plh')}
                  name='scripts'
                />
                <RHFCode
                  placeholder={translate('integrations_body_links_plh')}
                  name='scripts'
                  height='180px'
                  extensions={[javascript({ jsx: true })]}
                />
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              color='inherit'
              onClick={onCancel}
            >
              {translate('actions_cancel')}
            </Button>
            <LoadingButton
              loading={creatLoading || updateLoading}
              variant='contained'
              color='primary'
              type='submit'
            >
              {translate('actions_save')}
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  )
}
