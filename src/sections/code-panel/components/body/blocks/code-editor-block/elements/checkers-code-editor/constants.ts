import { type SxProps, type Theme } from '@mui/system'

export const CHECKERS_ANIMATION = {
  open: {
    width: 'auto',
    opacity: 1,
  },
  closed: {
    width: 0,
  },
}

export const OPEN_HANDLER_ANIMATION = {
  open: {
    opacity: 1,
    transition: { delay: 0.3 },
  },
  closed: {
    opacity: 0,
  },
}

export const getStackSx = (): SxProps<Theme> => ({
  top: '130px',
  right: 0,
  position: 'absolute',
  zIndex: 300,
  flexDirection: 'row',
})

export const getBoxSx = (theme: Theme) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 32,
  height: 35,
  borderRadius: theme.direction === 'ltr' ? '0 14px 14px 0' : '14px 0 0 14px',
  zIndex: 301,
  background: 'rgba(21, 82, 117, 0.80)',
  ':hover': {
    cursor: 'pointer',
  },
})

export const ICONIFY_SX = {
  '& path': {
    fill: '#000000',
  },
}

export const getMDivStyles = (theme: Theme) => ({
  background: '#155275CC',
  borderRadius: theme.direction === 'rtl' ? '0 16px 16px 0' : '16px 0 0 16px',
  overflow: 'hidden',
})

export const OPEN_BOX_SX = {
  position: 'absolute',
  zIndex: 300,
  top: 130,
  right: 0,
}

export const OPEN_BTN_WRAPPER_SX = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
}

export const INDICATORS_WRAPPER_SX = {
  zIndex: 1,
  width: 10,
  bottom: -45,
  right: 0,
  py: '5px',
  borderBottomLeftRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'end',
  background: 'rgba(21, 82, 117, 0.80)',
}

export const getIndicatorSx = (isValid: boolean): SxProps => ({
  width: 5,
  height: 20,
  color: 'red',
  borderTopLeftRadius: '14px',
  borderBottomLeftRadius: '14px',
  background: isValid ? '#75CF6D' : '#F44336',
})
