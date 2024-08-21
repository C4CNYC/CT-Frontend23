import { useState } from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'

import { Iconify } from '@/components'

interface Props {
  children: React.ReactElement[] | React.ReactElement
}

export default function DiamondFeatureModal({ children }: Props): React.ReactElement {
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
        <DialogTitle
          variant='h5'
          sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
        >
          <Iconify
            icon='ion:diamond-outline'
            color='#43D4DD'
          />
          Diamond Feature
        </DialogTitle>

        <DialogContent>
          <Typography>This feature is limited to DIAMOND accounts.</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={closeDialog}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
