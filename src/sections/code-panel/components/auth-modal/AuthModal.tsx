import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Dialog, DialogContent, IconButton, Link, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { PATH_AUTH } from '@root/src/routes/paths'
import { QUEST_LINK_SX } from '@root/src/sections/quest/constants'

interface IAuthDialog {
  open: boolean
  onClose: VoidFunction
}

export default function AuthModal({ open, onClose }: IAuthDialog) {
  const { push } = useRouter()

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <Box
        display='flex'
        justifyContent='end'
        alignItems='start'
      >
        <IconButton
          onClick={onClose}
          sx={{ mr: '10px', mt: '10px' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ px: 4, pb: 4, textAlign: 'center' }}>
        <Typography
          variant='h4'
          sx={{ pb: 3, fontSize: '22px' }}
        >
          OOPSIE... DOESN’T LOOK LIKE YOU
          <br /> ARE REGISTERED
        </Typography>
        <Typography
          variant='body1'
          sx={{ pb: 3, fontSize: '22px' }}
        >
          Don’t worry it is quick and easy.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Button
            sx={SKIP_BUTTON_SX}
            onClick={onClose}
          >
            SKIP
          </Button>
          <Button
            sx={BUTTON_SX}
            onClick={() => {
              push(PATH_AUTH.onBoardingStudent)
            }}
          >
            Register Now
          </Button>
        </Box>
        <Typography variant='h4'>
          I’ve been here before.{' '}
          <Link
            component={NextLink}
            href={PATH_AUTH.signIn}
            underline='none'
            typography='h4'
            sx={QUEST_LINK_SX}
          >
            LOGIN
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

const BUTTON_SX = {
  color: '#fff',
  px: 1,
  textTransform: 'uppercase',
  width: '305px',
  border: '4px solid #F6F9FC',
  height: '66px',
  margin: 0,
  display: 'flex',
  padding: '1px 8px 2px 7px',
  zIndex: 10,
  fontSize: '25px',
  textAlign: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  lineHeight: 1,
  borderRadius: '40px',
  backgroundColor: '#43D4DD',
  ml: '-45px',
  '&:hover': {
    backgroundColor: '#3fc6d0',
  },
}

const SKIP_BUTTON_SX = {
  ...BUTTON_SX,
  width: 180,
  bgcolor: '#C4C4C4',
  ml: 0,
  '&:hover': {
    bgcolor: '#b6b6b6',
  },
}
