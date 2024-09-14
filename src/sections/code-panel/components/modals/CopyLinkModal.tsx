import { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { useCopyToClipboard } from '@root/src/hooks'
import { useTranslate } from '@root/src/utils/translateHelper'

interface Props {
  children?: React.ReactElement[] | React.ReactElement
}

export default function CopyLinkModal({ children }: Props): React.ReactElement {
  const { asPath } = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const { copy } = useCopyToClipboard()
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()

  const openDialog = () => {
    setOpen(true)
  }
  const closeDialog = () => {
    setOpen(false)
  }

  const getCurrentLink = () => {
    if (typeof window !== 'undefined') {
      const fullPath = `${window.location.origin}${asPath}`
      return fullPath
    }
    return ''
  }

  const onCopy = () => {
    copy(getCurrentLink())
    enqueueSnackbar(translate('messages_copied'))
    closeDialog()
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!open) openDialog()
    }, 1000)

    return () => {
      clearInterval(timeout)
    }
  }, [])

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
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'transparent',
          },
        }}
        PaperProps={{ sx: { mb: '50px' } }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <DialogTitle
            variant='h6'
            sx={{ pt: 1, pb: 0, maxWidth: '250px' }}
          >
            Be awesome and tell someone about this. 😃
          </DialogTitle>
          <IconButton
            onClick={closeDialog}
            sx={{ mr: '14px', mt: '5px' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogActions sx={{ p: 0 }}>
          <Button
            onClick={onCopy}
            fullWidth
            variant='contained'
            sx={{
              fontSize: '1.1rem',
            }}
          >
            Copy Link
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
