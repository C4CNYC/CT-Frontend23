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
  FormControlLabel,
  Switch,
  Stack,
} from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFCode, RHFTextField } from '@/components'
import { ModalCodeFullscreen } from '@/components/modal-code-fullscreen'
import {
  useCreateEnvironmentMutation,
  useUpdateEnvironmentMutation,
} from '@/redux/services/manager/environments-manager'
import { useTranslate } from '@/utils/translateHelper'

import { FileUploadSection } from './FileUploadSection'

const EnvironmentSchema = Yup.object().shape({
  name: Yup.string().required('Environment name is required'),
})

interface EnvironmentForm {
  name: string
  description?: string
  head?: string
  scripts?: string
  configuration?: Record<string, any>
  active?: boolean
}

interface Prop {
  id?: string
  defaultValues?: EnvironmentForm
  children: React.ReactElement
  isEdit?: boolean
}

export function EnvironmentModal({
  isEdit = false,
  children,
  id,
  defaultValues = {
    name: '',
    description: '',
    head: '',
    scripts: '',
    configuration: {},
    active: true,
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
  const [createEnvironment, { isLoading: createLoading }] = useCreateEnvironmentMutation()
  const [updateEnvironment, { isLoading: updateLoading }] = useUpdateEnvironmentMutation()
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

  const { handleSubmit, watch } = methods
  const activeValue = watch('active', true)

  const onSubmit = async (data: EnvironmentForm): Promise<void> => {
    try {
      if (id) {
        await updateEnvironment({
          id,
          ...data,
        }).unwrap()
        enqueueSnackbar(translate('environment_updated_msg'))
      } else {
        await createEnvironment(data).unwrap()
        enqueueSnackbar(translate('environment_created_msg'))
      }
      methods.reset()
      handleClose()
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
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
        maxWidth='md'
      >
        <DialogTitle sx={{ pb: 2 }}>
          {isEdit ? translate('environments_edit') : translate('environments_create')}
        </DialogTitle>
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
              <Box>
                <RHFTextField
                  placeholder={translate('description')}
                  name='description'
                  multiline
                  rows={3}
                />
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      name='active'
                      checked={activeValue}
                      onChange={(e) => methods.setValue('active', e.target.checked)}
                    />
                  }
                  label={translate('active')}
                />
              </Box>
              <Box>
                <ModalCodeFullscreen
                  title={translate('environments_head_links')}
                  name='head'
                />
                <RHFCode
                  placeholder={translate('environments_head_links_plh')}
                  name='head'
                  height='180px'
                  extensions={[javascript({ jsx: true })]}
                />
              </Box>
              <Box>
                <ModalCodeFullscreen
                  title={translate('environments_body_scripts')}
                  name='scripts'
                />
                <RHFCode
                  placeholder={translate('environments_body_scripts_plh')}
                  name='scripts'
                  height='180px'
                  extensions={[javascript({ jsx: true })]}
                />
              </Box>
              {isEdit && id && (
                <Box>
                  <FileUploadSection environmentId={id} />
                </Box>
              )}
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
              loading={createLoading || updateLoading}
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
