import { useState } from 'react'

import { Box, Dialog, DialogContent, IconButton } from '@mui/material'

import { Iconify } from '@root/src/components'

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
          <Iconify icon='ic:round-close' />
        </IconButton>
        <DialogContent id='drawer-container'>
          <TeamplatesMenu />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SlideTemplateDialog
