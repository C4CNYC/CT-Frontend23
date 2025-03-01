import { useState } from 'react'

import { Box, Dialog, DialogContent, IconButton } from '@mui/material'
import { IoClose } from '@react-icons/all-files/io5/IoClose'

import { CLOSE_BTN_POSITION } from './constants'
import TeamplatesMenu from './TemplatesMenu'

interface ISlideTemplateDialog {
  children: React.ReactElement
}

const SlideTemplateDialog = ({ children }: ISlideTemplateDialog) => {
  const [open, setOpen] = useState(false)

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <>
      <Box onClick={handleOpen}>{children}</Box>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='lg'
      >
        <IconButton
          sx={CLOSE_BTN_POSITION}
          onClick={handleClose}
        >
          <IoClose />
        </IconButton>
        <DialogContent id='drawer-container'>
          <TeamplatesMenu />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SlideTemplateDialog
