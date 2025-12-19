import { Theme } from '@mui/system'

export const TOP_BAR_STYLES = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '5px',
  position: 'absolute',
  top: '20px',
  right: '10px',
  width: 'auto',
  zIndex: 10,
  transition: 'top 0.3s ease, right 0.3s ease',
}

export const ICON_BUTTON_STYLES = {
  width: '33px',
  minWidth: '33px',
  height: '33px',
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  '&.active': {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
  },
}

export const STACK_STYLES = {
  borderRadius: '35px',
  background: 'rgba(1, 152, 237, 0.1)',
  p: '2px',
  alignItems: 'center',
  textDecoration: 'none',
  pointerEvents: 'all',
  flexDirection: 'row',
}

export const OVERLAY_WRAPPER_SX = {
  display: 'flex',
  alignItems: 'center',
  bgcolor: '#EE467A',
  borderRadius: '35px',
  px: 1,
  py: '2px',
  gap: 1,
}

export const GROUP_TITLE_STYLES = {
  color: '#A6A6A6',
  mb: -0.5,
  textTransform: 'uppercase',
  fontSize: 8,
}

export const OVERLAY_AVATAR_SX = {
  border: '2px solid #FBDD3F',
  background: '#0198ED',
  width: '24px',
  height: '24px',
}

export const AVATAR_STYLES = {
  border: '2px solid #FBDD3F',
  background: '#0198ED',
  width: '24px',
  height: '24px',
}

export const STACK_GROUP_STYLES = {
  pl: 2,
  width: { md: '150px', lg: '200px' },
}

export const OVERLAY_GROUP_TITLE_SX = {
  color: '#fff',
  textTransform: 'uppercase',
  fontSize: 10,
  mb: -0.5,
}

export const TRIBE_NAME_STYLES = {
  color: '#0198ED',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}

export const ButtonStyle = (theme: Theme) => ({
  color: theme.palette.secondary.main,
  fontWeight: 200,
  '&:hover': {
    fontWeight: 700,
    background: '#99f1',
  },
})
