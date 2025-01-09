import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { useForm } from 'react-hook-form'

import { FormProvider, Image, RHFUpload, SingleFilePreview, useSnackbar } from '@/components'
import { useUpdateOwnerOrgFaviconMutation } from '@root/src/redux/services/admin/organization-admin'
import { useTranslate } from '@root/src/utils/translateHelper'

import { HELPER_IMG_TEXT, IMG_CONT, UPLOAD_IMG_BTN } from './constants'

interface FaviconTabProps {
  id: string
  favicon: string | null
}

const FaviconOwnerTab = ({ id, favicon }: FaviconTabProps): React.ReactElement => {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [uploadedFile, setUploadedFile] = useState<null | File>(null)

  const [updateFavicon, { isLoading }] = useUpdateOwnerOrgFaviconMutation()

  const methods = useForm()

  const onSubmit = async (): Promise<void> => {
    const file = new FormData()
    try {
      if (uploadedFile) {
        file.append('file', uploadedFile)
        await updateFavicon({ id, file }).unwrap()
        setUploadedFile(null)
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
          {favicon && (
            <Box sx={IMG_CONT}>
              <Image
                src={favicon}
                alt={favicon}
              />
            </Box>
          )}
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
              name='favicon'
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

export default FaviconOwnerTab
