import { Theme } from '@mui/material'

export const getLessonSx = (theme: Theme) => ({
  borderRadius: 2,
  p: 2,
  pr: 3,
  bgcolor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper,
  minHeight: '150px',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  transition: 'box-shadow 0.3s ease-in-out',
})

export const getLessonContentSx = (isMobile: boolean) => ({
  flexDirection: isMobile ? 'column' : 'row',
  alignItems: isMobile ? 'flex-start' : 'center',
  justifyContent: 'space-between',
  gap: isMobile ? 2 : 0,
})

export const SEE_MORE_SX = {
  alignSelf: 'flex-start',
  color: '#454F5B',
  gap: 1,
  p: 0,
  mt: 1,
  mb: 1,
  alignItems: 'center',
  '&:hover': {
    bgcolor: 'transparent',
  },
}

export const MODE_TITLE_SX = {
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  color: '#0198ED',
  background: 'linear-gradient(#7A16C9, #F618D3B5)',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

export const DURATION_SX = {
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
}

export const LINK_BTN_SX = {
  background: '#fff',
  borderRadius: '50%',
  display: 'flex',
  p: 1,
  boxShadow: 2,
}

export const getLockedBtnSx = () => ({
  cursor: 'pointer',
  display: 'flex',
  gap: 3,
  alignItems: 'center',
  background: '#0000001F',
  color: '#fff',
  borderRadius: '80px',
  p: 0.5,
  pl: 2,
  ml: 'auto',
})

export const LOCKED_BTN_SX = {
  background: '#fff',
  borderRadius: '50%',
  display: 'flex',
  p: 1,
  boxShadow: 2,
}

export const PROGRESS_DOT_SX = {
  position: 'absolute',
  right: 0,
  top: '-8px',
  width: '20px',
  height: '20px',
  backgroundColor: '#FFF',
  backgroundImage: 'url(/assets/courses/compleated.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: '14px',
  borderRadius: '50%',
  border: '1px solid #919EAB3D',
}

export const getProgressStyles = (isStarted: boolean) => ({
  border: '1px solid #919EAB3D',
  '& .MuiLinearProgress-bar': {
    background: isStarted
      ? 'linear-gradient(135deg, #FFF739 0%, #FF6DC5 100%)'
      : 'linear-gradient(135deg, #90F361 0%, #00D9CC 100%)',
  },
  position: 'relative',
  background: '#fff',
})

export const getStartLinkSx = () => ({
  display: 'flex',
  gap: 3,
  p: 0.5,
  pl: 2,
  alignItems: 'center',
  borderRadius: '80px',
  ml: 'auto',
  color: '#fff',
  background: 'linear-gradient(308.87deg, #FFF739 -19.29%, #FF6DC5 89.25%)',
})

export const DIALOG_TITLE_WRAPPER_SX = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const DIALOG_TITLE_SX = {
  pl: 3,
  pb: 2,
  pt: 3,
  mr: 3,
}

export const CLOSE_DIALOG_ICON_SX = {
  position: 'absolute',
  top: 12,
  right: 12,
}

export const DIALOG_CONTENT_WRAPPER_SX = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}

export const DIALOG_SUBTITLE_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
}

export const PAPER_PROPS_SX = {
  py: 4,
  px: { sm: 1, md: 3 },
}
