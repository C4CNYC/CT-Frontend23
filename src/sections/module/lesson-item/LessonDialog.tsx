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

import { useTranslate } from '@/utils/translateHelper'
import { MenuPopover } from '@root/src/components/menu-popover'

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
  children: React.ReactElement
  onOpenLesson: () => void
}

export default function LessonDialog({
  children,
  onOpenLesson,
}: ILessonDialog): React.ReactElement {
  const translate = useTranslate()

  const [open, setOpenDialog] = useState(false)
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
    <>
      <Box
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          // e.preventDefault()
          // e.stopPropagation()
          setOpenDialog(true)
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={(e: React.MouseEvent<HTMLElement>) => {
          // e.preventDefault()
          // e.stopPropagation()
          setOpenDialog(false)
        }}
        PaperProps={{
          sx: PAPER_PROPS_SX,
        }}
      >
        <DialogTitle sx={{ ...MODE_TITLE_SX, py: 0 }}>
          <RocketIcon
            width={20}
            height={20}
          />
          {translate('lesson_part_project_type')}
        </DialogTitle>
        <Box sx={DIALOG_TITLE_WRAPPER_SX}>
          <Typography
            sx={DIALOG_TITLE_SX}
            variant='h6'
          >
            {translate('lesson_dialog_title_2')}
          </Typography>
          <IconButton
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              // e.preventDefault()
              // e.stopPropagation()
              setOpenDialog(false)
            }}
            sx={CLOSE_DIALOG_ICON_SX}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={DIALOG_CONTENT_WRAPPER_SX}>
          <Box sx={DIALOG_SUBTITLE_SX}>
            <Typography>{translate('lesson_dialog_subtitle_1')}</Typography>
            <IconButton onClick={handleOpenPopover}>
              <CiCircleQuestion />
            </IconButton>
          </Box>
          <Typography>{translate('lesson_dialog_subtitle_2')}</Typography>
          <Button
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              // e.preventDefault()
              // e.stopPropagation()
              handleOpenPopover(e)
            }}
            sx={{ ...SEE_MORE_SX, my: 0 }}
          >
            {translate('lesson_dialog_learn_more')}
          </Button>
          <Button
            color='inherit'
            variant='soft'
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              // e.preventDefault()
              // e.stopPropagation()
              onOpenLesson()
            }}
          >
            {translate('lesson_dialog_btn_start')}
          </Button>
          <Button
            color='info'
            variant='soft'
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              // e.preventDefault()
              // e.stopPropagation()
              setOpenDialog(false)
            }}
          >
            {translate('lesson_dialog_go_back')}
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
            {translate('lesson_to_lesson_code_copying')}
          </Typography>
          <Typography
            variant='body1'
            sx={{ pb: 1 }}
          >
            {translate('lesson_to_lesson_code_copying_subtitle_1')}
          </Typography>
          <Typography
            variant='body1'
            sx={{ pb: 1 }}
          >
            {translate('lesson_to_lesson_code_copying_subtitle_2')}
          </Typography>
          <Typography
            variant='body1'
            sx={{ pb: 1 }}
          >
            {translate('lesson_to_lesson_code_copying_subtitle_3')}
          </Typography>
        </MenuPopover>
      </Dialog>
    </>
  )
}
