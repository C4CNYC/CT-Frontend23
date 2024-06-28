import { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Dialog, IconButton } from '@mui/material'

import StudentStepper from '@/sections/on-boarding-register/student/StudentStepper'

export default function SignUpDialog(): React.ReactElement | null {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (!open) setOpen(true)
    }, 5 * 60 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [open])

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <Box
        sx={{
          p: 5,
        }}
      >
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <StudentStepper />
      </Box>
    </Dialog>
  )
}
