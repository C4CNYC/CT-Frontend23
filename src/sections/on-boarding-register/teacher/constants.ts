import { styled, SxProps } from '@mui/system'

import { bgBlur } from '@root/src/utils'

export const StyledContentTeacher = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isAigenerated',
})<{ isAigenerated?: boolean }>(({ theme, isAigenerated }) => ({
  width: '100%',
  margin: 'auto',
  display: 'flex',
  borderRadius: '8px',
  justifyContent: 'center',
  padding: theme.spacing(2),
  ...bgBlur({ color: theme.palette.background.default }),
  [theme.breakpoints.up('sm')]: {
    maxWidth: isAigenerated ? 'auto' : '460px',
  },
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    padding: theme.spacing(3),
    width: isAigenerated ? 500 : 480,
  },
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    padding: theme.spacing(3),
    width: isAigenerated ? 800 : 480,
  },
}))

export const WELCOME_STEP_WRAPPER_SX = {
  ml: { xs: 3, sm: 3, md: 0 },
  mt: '10px',
  justifyContent: 'start',
}

export const WELCOME_STEP_SUBTITLE_SX = {
  pb: 1,
  ml: { xs: 3, sm: 3, md: 0 },
  textAlign: 'left',
}

export const POPUP_SESSION_BTN_SX = {
  py: 2,
  mb: 1,
  borderRadius: '15px',
  width: '100%',
}

export const LAUNCH_SESSION_BTN_SX = {
  color: 'inherit',
  py: 2,
  borderRadius: '15px',
  width: '100%',
  justifyContent: 'space-between',
}

export const getImageWrapperSx = (color: string): SxProps => ({
  display: { xs: 'none', sm: 'flex' },
  background: color,
  borderRadius: '15px',
  mr: 1,
  p: 1.5,
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '100px',
  width: '100px',
  height: '100px',
})

export const SUBMIT_BTN_SX = {
  background: '#43D4DD33',
  color: '#43D4DD',
  fontSize: '1.5rem',
  mt: 3,
  width: '100%',
  '&:hover': {
    background: '#43D4DD80',
    color: '#2FAAB3',
  },
}
