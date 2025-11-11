import { useState, useEffect } from 'react'

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
  org: any
  handleClose: () => void
}

const LogoTab = ({ org, handleClose }: LogoTabProps): React.ReactElement => {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const methods = useForm()

  const [logo, setLogo] = useState<File | string | null>(null)
  const [miniLogo, setMiniLogo] = useState<File | string | null>(null)
  const [favicon, setFavicon] = useState<File | string | null>(null)

  const [updateLogo, { isLoading: isLoadingLogo }] = useUpdateOrgLogoMutation()
  const [updateMiniLogo, { isLoading: isLoadingMiniLogo }] = useUpdateOrgLogoMiniMutation()
  const [updateFavicon, { isLoading: isLoadingFavicon }] = useUpdateOrgFaviconMutation()

  useEffect(() => {
    if (org) {
      setLogo(org.logo || null)
      setMiniLogo(org.min_logo || null)
      setFavicon(org.favicon || null)
    }
  }, [org])

  const renderUploadBlock = (
    title: string,
    file: File | string | null,
    setFile: (value: File | string | null) => void,
    name: string
  ) => (
    <Box>
      <Typography variant='body2'>{title}</Typography>
      <Box sx={{ position: 'relative', mb: 4 }}>
        {file && (
          <IconButton
            sx={UPLOAD_IMG_BTN}
            onClick={() => setFile(null)}
          >
            <IoMdClose size='20px' />
          </IconButton>
        )}

        <RHFUpload
          name={name}
          onDrop={(files: File[]) => setFile(files[0])}
          sx={{
            filter: file ? 'grayscale(1) contrast(1.2) brightness(0.8) blur(3px)' : 'none',
          }}
        />

        <Typography
          variant='caption'
          noWrap
          width='90px'
          sx={HELPER_IMG_TEXT}
        >
          {typeof file === 'string' ? '' : file?.name || ''}
        </Typography>

        <SingleFilePreview
          file={
            file
              ? typeof file === 'string'
                ? `${file}?t=${org.updatedAt || Date.now()}`
                : URL.createObjectURL(file)
              : null
          }
        />
      </Box>
    </Box>
  )

  const onSubmit = async (): Promise<void> => {
    try {
      if (logo && typeof logo !== 'string') {
        const fd = new FormData()
        fd.append('file', logo)
        await updateLogo({ id: org?.id, file: fd }).unwrap()
      }

      if (miniLogo && typeof miniLogo !== 'string') {
        const fd = new FormData()
        fd.append('file', miniLogo)
        await updateMiniLogo({ id: org?.id, file: fd }).unwrap()
      }

      if (favicon && typeof favicon !== 'string') {
        const fd = new FormData()
        fd.append('file', favicon)
        await updateFavicon({ id: org?.id, file: fd }).unwrap()
      }

      enqueueSnackbar(translate('messages_update_success'))
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
        {renderUploadBlock('Upload Logo', logo, setLogo, 'logo')}
        {renderUploadBlock('Upload Mini Logo', miniLogo, setMiniLogo, 'min_logo')}
        {renderUploadBlock('Upload Favicon', favicon, setFavicon, 'favicon')}

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '100%',
            p: '15px 25px',
            background: '#F6F9FC',
            zIndex: 10,
          }}
        >
          <Stack
            direction='row'
            justifyContent='flex-end'
            gap={1}
          >
            <Button onClick={handleClose}>{translate('actions_close')}</Button>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={isLoadingLogo || isLoadingMiniLogo || isLoadingFavicon}
            >
              {translate('actions_save')}
            </LoadingButton>
          </Stack>
        </Box>
      </Stack>
    </FormProvider>
  )
}

export default LogoTab
