import React, { useState, useEffect } from 'react'

import { javascript } from '@codemirror/lang-javascript'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFCode, RHFTextField } from '@/components'
import { ModalCodeFullscreen } from '@/components/modal-code-fullscreen'
import {
  useCreateEnvironmentMutation,
  useEditEnvironmentMutation,
} from '@/redux/services/manager/environments-manager'
import { useTranslate } from '@/utils/translateHelper'

const EnvironmentSchema = Yup.object().shape({
  name: Yup.string().required('Tenant name is required'),
})

interface EnvironmentForm {
  name: string
  html: string
}

interface Prop {
  id?: string
  defaultValues?: EnvironmentForm
  children: React.ReactElement
  isEdit?: boolean
}
// RHFCode
export function ModalEnvironments({
  isEdit = false,
  children,
  id,
  defaultValues = {
    name: '',
    html: '',
  },
}: Prop): React.ReactElement {
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  const [createEnvironment, { isLoading: creatLoading }] = useCreateEnvironmentMutation()
  const [updateEnvironment, { isLoading: updateLoading }] = useEditEnvironmentMutation()
  const translate = useTranslate()

  const methods = useForm<EnvironmentForm>({
    resolver: yupResolver(EnvironmentSchema),
    defaultValues,
  })

  useEffect(() => {
    if (open) {
      methods.reset(defaultValues)
    }
  }, [open])

  const { handleSubmit } = methods

  const onSubmit = async (data: EnvironmentForm): Promise<void> => {
    try {
      enqueueSnackbar(
        id ? translate('integrations_updated_msg') : translate('integrations_created_msg')
      )
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
    if (id) {
      await updateEnvironment({
        id,
        ...data,
      }).unwrap()
    } else {
      await createEnvironment(data).unwrap()
    }
    methods.reset()
    handleClose()
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
        <DialogTitle sx={{ pb: 2 }}>{translate('Create Environment')}</DialogTitle>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            {isEdit ? (
              <Stack gap={2}>
                <Box>
                  <RHFTextField
                    placeholder={translate('name')}
                    name='name'
                  />
                </Box>
                <Box>
                  <ModalCodeFullscreen
                    title={translate('html')}
                    name='html'
                  />
                  <RHFCode
                    placeholder={translate('html')}
                    name='html'
                    height='180px'
                    extensions={[javascript({ jsx: true })]}
                  />
                </Box>
              </Stack>
            ) : (
              <Stack gap={2}>
                <Box>
                  <RHFTextField
                    placeholder={translate('name')}
                    name='name'
                  />
                </Box>
                <Box>
                  <ModalCodeFullscreen
                    title={translate('html')}
                    name='html'
                  />
                  <RHFCode
                    placeholder={translate('html')}
                    name='html'
                    height='180px'
                    extensions={[javascript({ jsx: true })]}
                  />
                </Box>
              </Stack>
            )}
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
