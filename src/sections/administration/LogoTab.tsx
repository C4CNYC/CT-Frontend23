import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { useForm } from 'react-hook-form'

import { FormProvider, RHFUpload, SingleFilePreview, useSnackbar } from '@/components'
import {
  useUpdateOrgLogoMutation,
  useUpdateOrgLogoMiniMutation,
  useUpdateOrgFaviconMutation,
} from '@root/src/redux/services/manager/super-admin'
import { useTranslate } from '@root/src/utils/translateHelper'

import { HELPER_IMG_TEXT, UPLOAD_IMG_BTN } from './constants'

interface LogoTabProps {
  id: string
  handleClose: () => void
}

const LogoTab = ({ id, handleClose }: LogoTabProps): React.ReactElement => {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [uploadedFileLogo, setUploadedFileLogo] = useState<null | File>(null)
  const [uploadedFileMiniLogo, setUploadedFileMiniLogo] = useState<null | File>(null)
  const [uploadedFileFavicon, setUploadedFileFavicon] = useState<null | File>(null)

  const [updateLogo, { isLoading: isLoadingLogo }] = useUpdateOrgLogoMutation()
  const [updateMiniLogo, { isLoading: isLoadingMiniLogo }] = useUpdateOrgLogoMiniMutation()
  const [updateFavicon, { isLoading: isLoadingFavicon }] = useUpdateOrgFaviconMutation()

  const methods = useForm()

  const onSubmit = async (): Promise<void> => {
    const file = new FormData()
    const fileMiniLogo = new FormData()
    const fileFavicon = new FormData()

    try {
      if (uploadedFileLogo) {
        file.append('file', uploadedFileLogo)
        await updateLogo({ id, file }).unwrap()
      }
      if (uploadedFileMiniLogo) {
        fileMiniLogo.append('file', uploadedFileMiniLogo)
        await updateMiniLogo({ id, file: fileMiniLogo }).unwrap()
      }
      if (uploadedFileFavicon) {
        fileFavicon.append('file', uploadedFileFavicon)
        await updateFavicon({ id, file: fileFavicon }).unwrap()
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
          <Typography variant='body2'>Upload Logo</Typography>
          <Box sx={{ position: 'relative', mb: 4 }}>
            {uploadedFileLogo ? (
              <IconButton
                sx={UPLOAD_IMG_BTN}
                onClick={() => {
                  setUploadedFileLogo(null)
                }}
              >
                <IoMdClose size='20px' />
              </IconButton>
            ) : null}
            <RHFUpload
              name='logo'
              onDrop={(files: File[]) => {
                setUploadedFileLogo(files[0])
              }}
              helperText={
                <Typography
                  variant='caption'
                  noWrap
                  width='90px'
                  sx={HELPER_IMG_TEXT}
                >
                  {uploadedFileLogo?.name}
                </Typography>
              }
            />
            <SingleFilePreview
              file={uploadedFileLogo ? URL.createObjectURL(uploadedFileLogo) : null}
            />
          </Box>

          <Typography variant='body2'>Upload Mini Logo</Typography>
          <Box sx={{ position: 'relative', mb: 4 }}>
            {uploadedFileMiniLogo ? (
              <IconButton
                sx={UPLOAD_IMG_BTN}
                onClick={() => {
                  setUploadedFileMiniLogo(null)
                }}
              >
                <IoMdClose size='20px' />
              </IconButton>
            ) : null}
            <RHFUpload
              name='logo_mini'
              onDrop={(files: File[]) => {
                setUploadedFileMiniLogo(files[0])
              }}
              helperText={
                <Typography
                  variant='caption'
                  noWrap
                  width='90px'
                  sx={HELPER_IMG_TEXT}
                >
                  {uploadedFileMiniLogo?.name}
                </Typography>
              }
            />
            <SingleFilePreview
              file={uploadedFileMiniLogo ? URL.createObjectURL(uploadedFileMiniLogo) : null}
            />
          </Box>

          <Typography variant='body2'>Upload Favicon</Typography>
          <Box sx={{ position: 'relative', mb: 4 }}>
            {uploadedFileFavicon ? (
              <IconButton
                sx={UPLOAD_IMG_BTN}
                onClick={() => {
                  setUploadedFileFavicon(null)
                }}
              >
                <IoMdClose size='20px' />
              </IconButton>
            ) : null}
            <RHFUpload
              name='favicon'
              onDrop={(files: File[]) => {
                setUploadedFileFavicon(files[0])
              }}
              helperText={
                <Typography
                  variant='caption'
                  noWrap
                  width='90px'
                  sx={HELPER_IMG_TEXT}
                >
                  {uploadedFileFavicon?.name}
                </Typography>
              }
            />
            <SingleFilePreview
              file={uploadedFileFavicon ? URL.createObjectURL(uploadedFileFavicon) : null}
            />
          </Box>

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
            <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 1 }}>
              <Button onClick={handleClose}>{translate('actions_close')}</Button>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isLoadingLogo || isLoadingMiniLogo || isLoadingFavicon}
              >
                {translate('actions_save')}
              </LoadingButton>
            </Stack>
          </div>
        </Stack>
      </FormProvider>
    </>
  )
}

export default LogoTab
