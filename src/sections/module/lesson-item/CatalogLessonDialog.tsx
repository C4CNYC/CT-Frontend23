import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { useTranslate } from '@/utils/translateHelper'

import {
  CLOSE_DIALOG_ICON_SX,
  DIALOG_CONTENT_WRAPPER_SX,
  DIALOG_TITLE_SX,
  DIALOG_TITLE_WRAPPER_SX,
  PAPER_PROPS_SX,
} from './constants'

interface ILessonDialog {
  open: boolean
  closeDialog: VoidFunction
  confirmClick: VoidFunction
  title: string
  confirmText: string
  closeText?: string | undefined
}

export default function CatalogLessonDialog({
  confirmText,
  closeText,
  title,
  open,
  closeDialog,
  confirmClick,
}: ILessonDialog): React.ReactElement {
  const router = useRouter()
  const translate = useTranslate()

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
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
          onClick={closeDialog}
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
              closeDialog()
            }}
          >
            {closeText}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
