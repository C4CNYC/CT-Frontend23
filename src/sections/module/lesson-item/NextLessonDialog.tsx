import { useRef, useState } from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { FaRegLightbulb } from '@react-icons/all-files/fa/FaRegLightbulb'
import { HiOutlinePuzzle } from '@react-icons/all-files/hi/HiOutlinePuzzle'

import { useTranslate } from '@/utils/translateHelper'
import { MenuPopover } from '@root/src/components'

interface INextLessonDialog {
  children: React.ReactElement
  onOpenLesson: () => void
}

export default function NextLessonDialog({
  children,
  onOpenLesson,
}: INextLessonDialog): React.ReactElement {
  const translate = useTranslate()

  const [open, setOpenDialog] = useState(false)
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const iconButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleOpenPopover = (): void => {
    if (iconButtonRef.current) {
      setOpenPopover(iconButtonRef.current)
    }
  }
  const togglePopover = () => {
    if (openPopover) {
      handleClosePopover()
    } else {
      handleOpenPopover()
    }
  }
  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

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
        fullWidth
        maxWidth={'xs'}
        onClose={() => {
          setOpenDialog(false)
        }}
        PaperProps={{
          sx: {
            position: 'relative',
          },
        }}
      >
        <DialogTitle sx={DIALOG_TITLE_SX}>
          <HiOutlinePuzzle size={25} />
          <Typography
            variant='h4'
            fontWeight={'400'}
          >
            {translate('next_lesson_modal_title_1')}
          </Typography>
          <Typography variant='h4'>{translate('next_lesson_modal_title_2')}</Typography>
        </DialogTitle>
        <Box sx={POPOVER_BTN_SX}>
          <IconButton
            onClick={togglePopover}
            ref={iconButtonRef}
            sx={{ color: '#fff' }}
          >
            <FaRegLightbulb size={22} />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography
            variant='h5'
            fontWeight={'400'}
            pb={2}
          >
            {translate('next_lesson_modal_text_1')}
          </Typography>

          <Typography
            variant='h5'
            fontWeight={'400'}
            pb={2}
          >
            {translate('next_lesson_modal_text_2')}
          </Typography>
          <Button
            onClick={handleOpenPopover}
            variant='text'
            sx={SEE_MORE_BTN_SX}
          >
            {translate('lesson_dialog_learn_more')}
          </Button>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant='contained'
            fullWidth
            size='large'
            sx={ACTION_BTN_SX}
          >
            {translate('next_lesson_modal_btn_1')}
          </Button>
          <Button
            size='large'
            variant='contained'
            fullWidth
            sx={{ ml: '0 !important', fontSize: '1.2rem' }}
          >
            {translate('next_lesson_modal_btn_2')}
          </Button>
        </DialogActions>
        <MenuPopover
          open={openPopover}
          arrow='bottom-center'
          onClose={handleClosePopover}
          disabledArrow
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 55, horizontal: 402 }}
          sx={POPOVER_SX}
          disablePortal
        >
          <Typography variant='h6'> {translate('next_lesson_modal_popover_title')}</Typography>
          <Typography>{translate('next_lesson_modal_popover_text_1')}</Typography>
          <Typography>{translate('next_lesson_modal_popover_text_2')}</Typography>
          <Typography>{translate('next_lesson_modal_popover_text_3')}</Typography>
          <Typography>{translate('next_lesson_modal_popover_text_4')}</Typography>
        </MenuPopover>
      </Dialog>
    </>
  )
}

const POPOVER_SX = {
  width: 400,
  border: '2px solid #FBDD3F',
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
}

const SEE_MORE_BTN_SX = {
  color: '#A6A6A6',
  '&:hover': {
    background: '#E0E0E0',
    color: '#808080',
  },
}

const ACTION_BTN_SX = {
  fontSize: '1.2rem',
  background: '#A6A6A6',
  '&:hover': {
    background: '#8C8C8C',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
}

const POPOVER_BTN_SX = {
  position: 'absolute',
  right: 0,
  top: 45,
  background: '#FBDD3F',
  borderTopLeftRadius: '8px',
  borderBottomLeftRadius: '8px',
  zIndex: 3000,
}

const DIALOG_TITLE_SX = { display: 'flex', gap: 1, alignItems: 'center', color: '#0198ED' }
