import React, { useCallback, useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useDropzone } from 'react-dropzone'

import { useUploadEnvironmentFileMutation } from '@/redux/services/manager/environments-manager'
import { useTranslate } from '@/utils/translateHelper'

interface FileUploadSectionProps {
  environmentId: string
}

export function FileUploadSection({ environmentId }: FileUploadSectionProps): React.ReactElement {
  const [uploadFile, { isLoading }] = useUploadEnvironmentFileMutation()
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.zip'],
      'application/x-tar': ['.tar', '.tar.gz'],
    },
    multiple: false,
  })

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) return

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      await uploadFile({
        id: environmentId,
        file: formData,
      }).unwrap()

      enqueueSnackbar(translate('environment_file_uploaded'))
      setSelectedFile(null)
    } catch (error) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  const handleRemoveFile = (): void => {
    setSelectedFile(null)
  }

  return (
    <Box>
      <Typography
        variant='h6'
        sx={{ mb: 2 }}
      >
        {translate('environments_file_upload')}
      </Typography>
      <Stack gap={2}>
        {!selectedFile ? (
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.300',
              borderRadius: 1,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: isDragActive ? 'action.hover' : 'transparent',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'action.hover',
                borderColor: 'primary.main',
              },
            }}
          >
            <input {...getInputProps()} />
            <Typography
              variant='body2'
              color='text.secondary'
            >
              {isDragActive
                ? translate('environments_drop_file_here')
                : translate('environments_drag_drop_file')}
            </Typography>
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ mt: 1 }}
            >
              {translate('environments_supported_formats')}: .zip, .tar, .tar.gz
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: 1,
              p: 2,
              backgroundColor: 'primary.light',
            }}
          >
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography variant='body2'>
                {translate('environments_selected_file')}: {selectedFile.name}
              </Typography>
              <Button
                size='small'
                color='error'
                onClick={handleRemoveFile}
              >
                {translate('actions_remove')}
              </Button>
            </Stack>
            <Typography
              variant='caption'
              color='text.secondary'
            >
              {translate('environments_file_size')}: {(selectedFile.size / 1024 / 1024).toFixed(2)}{' '}
              MB
            </Typography>
          </Box>
        )}
        {selectedFile && (
          <LoadingButton
            loading={isLoading}
            variant='contained'
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            {translate('environments_upload_file')}
          </LoadingButton>
        )}
      </Stack>
    </Box>
  )
}
