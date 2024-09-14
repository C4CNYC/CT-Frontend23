import { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'

import { PATH_AUTH } from '@root/src/routes/paths'

interface Props {
  children?: React.ReactElement[] | React.ReactElement
}

export default function WelcomeCodePanelModal({ children }: Props): React.ReactElement {
  const [open, setOpen] = useState<boolean>(true)

  const openDialog = () => {
    setOpen(true)
  }
  const closeDialog = () => {
    setOpen(false)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!open) openDialog()
    }, 400)

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
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          },
        }}
        PaperProps={{ sx: { mt: '50px' } }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <DialogTitle
            variant='h5'
            sx={{ pb: 1, pt: 2 }}
          >
            Hi there 👋🏼
          </DialogTitle>
          <IconButton
            onClick={closeDialog}
            sx={{ mr: '14px', mt: '5px' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography
            variant='body1'
            maxWidth={250}
          >
            To edit ✏️ or save 💾 this lesson please{' '}
            <Link
              component={NextLink}
              href={PATH_AUTH.onBoardingTeacher.root}
              sx={{
                color: 'inherit',
                textDecoration: 'underline',
              }}
            >
              {' '}
              Register{' '}
            </Link>{' '}
            or{' '}
            <Link
              component={NextLink}
              href={PATH_AUTH.signIn}
              sx={{
                color: 'inherit',
                textDecoration: 'underline',
              }}
            >
              {' '}
              Login{' '}
            </Link>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant='soft'
            LinkComponent={NextLink}
            href={PATH_AUTH.onBoardingTeacher.root}
            sx={{
              fontSize: '1.1rem',
              fontWeight: 400,
              background: '#F0EEEE80',
              color: '#5D6C75',
              '&:hover': { background: 'transparent' },
            }}
          >
            Register or Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
