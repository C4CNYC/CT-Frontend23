import React from 'react'

import { Skeleton } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { useTranslate } from '@/lib/utils/translateHelper'

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
  onChangeFile?: (event: React.ChangeEvent<HTMLInputElement>) => void
  //
  open: boolean
  onClose: VoidFunction
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
  ...other
}: Props) {
  const translate = useTranslate()

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
          {(onCreate || onUpdate) && (
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
            <TextField
              inputProps={{ accept: 'image/*' }}
              type='file'
              onChange={onChangeFile}
            />
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
              disabled={fileLoading || !folderName || !fileUrl}
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
