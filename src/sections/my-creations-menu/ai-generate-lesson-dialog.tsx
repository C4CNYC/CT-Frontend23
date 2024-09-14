import { useState } from 'react'

import { Box, Dialog, DialogContent } from '@mui/material'

import AIGenerateStepper from '../on-boarding-register/teacher/ai-generete-stepper'

interface Props {
  children: React.ReactElement[] | React.ReactElement
}

export default function AiGenerateLessonDialog({ children }: Props): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false)

  const openDialog = () => {
    setOpen(true)
  }
  const closeDialog = () => {
    setOpen(false)
  }

  return (
    <>
      <Box
        onClick={() => {
          openDialog()
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={closeDialog}
      >
        <DialogContent sx={{ p: 2 }}>
          <AIGenerateStepper isModal />
        </DialogContent>
      </Dialog>
    </>
  )
}
