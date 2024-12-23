import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Dialog, DialogContent, IconButton, Typography } from '@mui/material'

import {
  CLOSE_DIALOG_ICON_SX,
  DIALOG_CONTENT_WRAPPER_SX,
  DIALOG_TITLE_SX,
  DIALOG_TITLE_WRAPPER_SX,
  PAPER_PROPS_SX,
} from './constants'

interface ILessonDialog {
  confirmClick: VoidFunction
  title: string
  confirmText: string
  closeText?: string | undefined
  children: React.ReactElement
}

export default function CatalogLessonDialog({
  confirmText,
  closeText,
  title,
  confirmClick,
  children,
}: ILessonDialog): React.ReactElement {
  const [open, setOpenDialog] = useState(false)
  return (
    <>
      <Box
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpenDialog(false)
        }}
        PaperProps={{
          sx: PAPER_PROPS_SX,
        }}
      >
        <Box sx={DIALOG_TITLE_WRAPPER_SX}>
          <Typography
            sx={DIALOG_TITLE_SX}
            variant='h6'
          >
            {title}
          </Typography>
          <IconButton
            onClick={() => {
              setOpenDialog(false)
            }}
            sx={CLOSE_DIALOG_ICON_SX}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={DIALOG_CONTENT_WRAPPER_SX}>
          <Button
            color='inherit'
            variant='soft'
            onClick={confirmClick}
          >
            {confirmText}
          </Button>
          {closeText && (
            <Button
              color='info'
              variant='soft'
              onClick={() => {
                setOpenDialog(false)
              }}
            >
              {closeText}
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
