import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { CiCircleQuestion } from '@react-icons/all-files/ci/CiCircleQuestion'
import { useRouter } from 'next/router'

import { useTranslate } from '@/utils/translateHelper'

import {
  CLOSE_DIALOG_ICON_SX,
  DIALOG_CONTENT_WRAPPER_SX,
  DIALOG_SUBTITLE_SX,
  DIALOG_TITLE_WRAPPER_SX,
} from './constants'

interface ILessonDialog {
  open: boolean
  closeDialog: VoidFunction
  link: string
}

export default function LessonDialog({
  open,
  closeDialog,
  link,
}: ILessonDialog): React.ReactElement {
  const router = useRouter()
  const translate = useTranslate()

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
    >
      <Box padding={4}>
        <Box sx={DIALOG_TITLE_WRAPPER_SX}>
          <DialogTitle>{translate('lesson_dialog_title')}</DialogTitle>
          <IconButton
            onClick={closeDialog}
            sx={CLOSE_DIALOG_ICON_SX}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={DIALOG_CONTENT_WRAPPER_SX}>
          <Box sx={DIALOG_SUBTITLE_SX}>
            <Typography>{translate('lesson_dialog_subtitle')}</Typography>
            <Tooltip
              title={<Typography fontSize={14}>{translate('lesson_dialog_tooltip')}</Typography>}
            >
              <IconButton>
                <CiCircleQuestion />
              </IconButton>
            </Tooltip>
          </Box>

          <Button
            color='inherit'
            variant='soft'
            onClick={() => {
              router.push(link)
            }}
          >
            {translate('lesson_dialog_btn_start')}
          </Button>
          <Button
            color='info'
            variant='soft'
            onClick={() => {
              closeDialog()
            }}
          >
            {translate('lesson_dialog_btn_back')}
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  )
}
