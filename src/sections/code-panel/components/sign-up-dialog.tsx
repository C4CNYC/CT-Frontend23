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
    const interval = setTimeout(
      () => {
        if (!open) setOpen(true)
      },
      1 * 60 * 1000
    )

    return () => {
      clearTimeout(interval)
    }
  }, [])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{ sx: { background: '#E6FBFC', px: 2, pb: 3, pt: 7 } }}
    >
      <Box>
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
