import { keyframes } from '@mui/system'

export const SCALE_IN_STYLES = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

export const CONTEXT_MENU_STYLES = {
  position: 'fixed',
  zIndex: 1000,
  background: '#2c3e50',
  borderRadius: '8px',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  animation: `${SCALE_IN_STYLES} 0.15s ease-out`,
}

export const CONTEXT_BUTTON_STYLES = {
  background: 'rgba(255, 255, 255, 0.1)',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  padding: '6px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
  },
}

export const DIVIDER_STYLES = {
  width: '1px',
  height: '20px',
  background: 'rgba(255, 255, 255, 0.3)',
  mx: '1px',
}

export const ARROW_STYLES = {
  position: 'absolute',
  width: 0,
  height: 0,
  border: '5px solid transparent',
}

export const ARROWS_STYLES = {
  top: {
    ...ARROW_STYLES,
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderTopColor: '#2c3e50',
  },
  bottom: {
    ...ARROW_STYLES,
    top: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderBottomColor: '#2c3e50',
  },
  left: {
    ...ARROW_STYLES,
    right: '-10px',
    top: '50%',
    transform: 'translateY(-50%)',
    borderLeftColor: '#2c3e50',
  },
  right: {
    ...ARROW_STYLES,
    left: '-10px',
    top: '50%',
    transform: 'translateY(-50%)',
    borderRightColor: '#2c3e50',
  },
}
