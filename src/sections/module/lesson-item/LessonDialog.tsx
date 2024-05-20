import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { CiCircleQuestion } from '@react-icons/all-files/ci/CiCircleQuestion'
import { useRouter } from 'next/router'

import { useTranslate } from '@/utils/translateHelper'
import { MenuPopover } from '@root/src/components'

import RocketIcon from '../icons/RocketIcon'

import {
  CLOSE_DIALOG_ICON_SX,
  DIALOG_CONTENT_WRAPPER_SX,
  DIALOG_SUBTITLE_SX,
  DIALOG_TITLE_SX,
  DIALOG_TITLE_WRAPPER_SX,
  MODE_TITLE_SX,
  PAPER_PROPS_SX,
  SEE_MORE_SX,
} from './constants'

interface ILessonDialog {
  open: boolean
  closeDialog: VoidFunction
  openLesson: VoidFunction
}

export default function LessonDialog({
  open,
  closeDialog,
  openLesson,
}: ILessonDialog): React.ReactElement {
  const router = useRouter()
  const translate = useTranslate()
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      PaperProps={{
        sx: PAPER_PROPS_SX,
      }}
    >
      <DialogTitle sx={{ ...MODE_TITLE_SX, py: 0 }}>
        <RocketIcon
          width={20}
          height={20}
        />
        Part of Project
      </DialogTitle>
      <Box sx={DIALOG_TITLE_WRAPPER_SX}>
        <Typography
          sx={DIALOG_TITLE_SX}
          variant='h6'
        >
          This Lesson Builds on the Previous One 🏗️
        </Typography>
        <IconButton
          onClick={closeDialog}
          sx={CLOSE_DIALOG_ICON_SX}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={DIALOG_CONTENT_WRAPPER_SX}>
        <Box sx={DIALOG_SUBTITLE_SX}>
          <Typography>
            It looks like you haven’t finished (at least 90% ) of the previous lesson. 🙀
          </Typography>
          <IconButton onClick={handleOpenPopover}>
            <CiCircleQuestion />
          </IconButton>
        </Box>
        <Typography>
          So we'll insert "Standard" code, but if you go back NOW and finish, then your own code
          will automatically be passed to this lesson. 😃
        </Typography>
        <Button
          onClick={handleOpenPopover}
          sx={{ ...SEE_MORE_SX, my: 0 }}
        >
          Learn more
        </Button>
        <Button
          color='inherit'
          variant='soft'
          onClick={openLesson}
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
          No. I'll go back to finsh
        </Button>
      </DialogContent>
      <MenuPopover
        open={openPopover}
        arrow='bottom-center'
        onClose={handleClosePopover}
        disabledArrow
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 50, horizontal: -50 }}
        sx={{ p: 3, width: 400 }}
      >
        <Typography
          variant='h4'
          sx={{ pb: 2 }}
        >
          Lesson to Lesson Code Copying
        </Typography>
        <Typography
          variant='body1'
          sx={{ pb: 1 }}
        >
          We made it like this, so that you can start any lesson you want at any time. 👀 🤩
        </Typography>
        <Typography
          variant='body1'
          sx={{ pb: 1 }}
        >
          But if you want your special code, with all your personal customizations to be passed
          automatically, then you have to complete, at least, 90%.
        </Typography>
        <Typography
          variant='body1'
          sx={{ pb: 1 }}
        >
          But don't worry. Whatever you choose is just fine. As long as you just keep coding. 🙌
          Yaay!
        </Typography>
      </MenuPopover>
    </Dialog>
  )
}
