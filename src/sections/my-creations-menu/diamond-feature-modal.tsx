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
import { useTranslate } from '@root/src/utils/translateHelper'

interface Props {
  children: React.ReactElement[] | React.ReactElement
}

export default function DiamondFeatureModal({ children }: Props): React.ReactElement {
  const translate = useTranslate()
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
          {translate('diamond_feature_title')}
        </DialogTitle>

        <DialogContent>
          <Typography>{translate('diamond_feature_subtitle')}</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={closeDialog}>{translate('actions_ok')}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
