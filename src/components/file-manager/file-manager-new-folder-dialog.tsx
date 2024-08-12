import React from 'react'

import { IconButton, Skeleton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { useForm } from 'react-hook-form'

import { RHFUpload, SingleFilePreview } from '@/components'
import { FormProvider } from '@/components'
import { HELPER_IMG_TEXT, UPLOAD_IMG_BTN } from '@/sections/dashboard/modules/constants'
import { useTranslate } from '@/utils/translateHelper'

interface Props extends DialogProps {
  title?: string
  label?: string
  name?: string
  fileLoading?: boolean
  fileUrl?: string
  //
  onCreate?: VoidFunction
  onUpdate?: VoidFunction
  //
  folderName?: string
  onChangeFolderName?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeFile?: (newFile: File) => void
  //
  open: boolean
  onClose: VoidFunction
  setFileUrl?: (file: null | File) => void
}

export default function FileManagerNewFolderDialog({
  title = 'Upload Files',
  open,
  label,
  name,
  onClose,
  fileLoading,
  fileUrl,

  //
  onCreate,
  onUpdate,
  //
  folderName,
  onChangeFolderName,
  onChangeFile,
  setFileUrl,
  ...other
}: Props) {
  const translate = useTranslate()
  const methods = useForm({
    defaultValues: {
      module_img: '',
    },
  })
  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={onClose}
      {...other}
    >
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

      {!fileLoading ? (
        <DialogContent
          dividers
          sx={{ pt: 1, pb: 0, border: 'none' }}
        >
          {(onCreate || onUpdate) && name !== 'file' && (
            <TextField
              fullWidth
              label={label || translate('folder_name')}
              value={folderName}
              onChange={onChangeFolderName}
              sx={{ mb: 3 }}
              name={name}
              required
            />
          )}
          {onChangeFile && (
            <>
              <FormProvider methods={methods}>
                <Box sx={{ position: 'relative' }}>
                  {fileUrl ? (
                    <IconButton
                      sx={UPLOAD_IMG_BTN}
                      onClick={() => {
                        setFileUrl?.(null)
                      }}
                    >
                      <IoMdClose size='20px' />
                    </IconButton>
                  ) : null}
                  <RHFUpload
                    name='module_img'
                    onDrop={(files: File[]) => {
                      onChangeFile(files[0])
                    }}
                    helperText={
                      <Typography
                        variant='caption'
                        noWrap
                        width='90px'
                        sx={HELPER_IMG_TEXT}
                      >
                        {fileUrl}
                      </Typography>
                    }
                  />
                  <SingleFilePreview file={fileUrl || null} />
                </Box>
              </FormProvider>
            </>
          )}
        </DialogContent>
      ) : (
        <Skeleton
          variant='rectangular'
          height='160px'
        />
      )}

      <DialogActions>
        {(onCreate || onUpdate) && (
          <Stack
            direction='row'
            justifyContent='flex-end'
            flexGrow={1}
          >
            <Button
              disabled={fileLoading || !folderName || (name === 'file' && !fileUrl)}
              variant='soft'
              onClick={onCreate || onUpdate}
            >
              {onUpdate ? translate('save') : translate('create')}
            </Button>
          </Stack>
        )}
      </DialogActions>
    </Dialog>
  )
}
