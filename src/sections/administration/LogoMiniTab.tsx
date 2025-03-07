import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { useForm } from 'react-hook-form'

import { FormProvider, RHFUpload, SingleFilePreview, useSnackbar } from '@root/src/components'
import { useUpdateOrgLogoMiniMutation } from '@root/src/redux/services/manager/super-admin'
import { useTranslate } from '@root/src/utils/translateHelper'

import { HELPER_IMG_TEXT, UPLOAD_IMG_BTN } from './constants'

interface LogoMiniTabProps {
  handleClose: () => void
  id: string
}

const LogoMiniTab = ({ id, handleClose }: LogoMiniTabProps): React.ReactElement => {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [uploadedFile, setUploadedFile] = useState<null | File>(null)

  const [updateLogo, { isLoading }] = useUpdateOrgLogoMiniMutation()

  const methods = useForm()

  const onSubmit = async (): Promise<void> => {
    const file = new FormData()
    try {
      if (uploadedFile) {
        file.append('file', uploadedFile)
        await updateLogo({ id, file }).unwrap()
      }
      enqueueSnackbar(translate('messages_update_success'))
    } catch (e: any) {
      enqueueSnackbar(e.data.message ?? translate('message_error'), { variant: 'error' })
    }
  }

  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{ height: '100%' }}
      >
        <Stack
          justifyContent='space-between'
          height='100%'
        >
          <Box sx={{ position: 'relative' }}>
            {uploadedFile ? (
              <IconButton
                sx={UPLOAD_IMG_BTN}
                onClick={() => {
                  setUploadedFile(null)
                }}
              >
                <IoMdClose size='20px' />
              </IconButton>
            ) : null}
            <RHFUpload
              name='logo_mini'
              onDrop={(files: File[]) => {
                setUploadedFile(files[0])
              }}
              helperText={
                <Typography
                  variant='caption'
                  noWrap
                  width='90px'
                  sx={HELPER_IMG_TEXT}
                >
                  {uploadedFile?.name}
                </Typography>
              }
            />
            <SingleFilePreview file={uploadedFile ? URL.createObjectURL(uploadedFile) : null} />
          </Box>

          <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end', mt: 5.5, gap: 1 }}>
            <Button onClick={handleClose}>{translate('actions_close')}</Button>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={isLoading}
            >
              {translate('actions_save')}
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  )
}

export default LogoMiniTab
