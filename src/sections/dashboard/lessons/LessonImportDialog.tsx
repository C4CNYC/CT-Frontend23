import React, { ChangeEvent, useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { FaCloudArrowDown } from '@react-icons/all-files/fa6/FaCloudArrowDown'
import { useRouter } from 'next/router'

import { useSnackbar } from '@root/src/components/snackbar'
import { useBoolean } from '@root/src/hooks/use-boolean'
import { useImportLessonMutation } from '@root/src/redux/services/manager/lessons-manager'
import { useTranslate } from '@root/src/utils/translateHelper'

export function LessonImportDialog() {
  const {
    value: openDialog,
    onTrue: handleOpenDialog,
    onFalse: handleCloseDialog,
  } = useBoolean(false)

  const router = useRouter()
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const [LessonImport] = useImportLessonMutation()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      enqueueSnackbar(translate('error_no_file_selected'), { variant: 'error' })
      return
    }

    try {
      const response = await LessonImport({ file: selectedFile }).unwrap()
      if (!response.id) return enqueueSnackbar(translate('error'), { variant: 'error' })
      enqueueSnackbar(translate('exportimport.success'), { variant: 'success' })

      if (window.confirm(translate('exportimport.open_new_lesson'))) {
        router.push(
          `${router.pathname}?${new URLSearchParams({ lessonId: response.id })}`,
          undefined,
          {
            shallow: true,
          }
        )
      }

      handleCloseDialog()
    } catch (error) {
      enqueueSnackbar(translate('exportimport.error_import_failed'), { variant: 'error' })
    }
  }

  return (
    <>
      <Button
        variant='contained'
        startIcon={<FaCloudArrowDown />}
        sx={{ mr: 2 }}
        onClick={handleOpenDialog}
      >
        {translate('actions_import')}
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{translate('exportimport.dialog_import_lesson')}</DialogTitle>
        <DialogContent>
          <TextField
            type='file'
            onChange={handleFileChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color='secondary'
          >
            {translate('actions_cancel')}
          </Button>
          <Button
            onClick={handleImport}
            color='primary'
          >
            {translate('actions_import')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
