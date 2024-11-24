import { SxProps, Theme } from '@mui/system'

export const TRIBE_LINK_SX = {
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  p: 0,
  justifyContent: 'flex-start',
  position: 'relative',
  borderRadius: 1,
  '&:hover': {
    backgroundColor: 'rgba(145, 158, 171, 0.08)',
  },
}

export const getSignOfActiveLink = (theme: Theme, isActive: boolean): SxProps => ({
  position: 'absolute',
  top: '5px',
  left: '-12px',
  height: '30px',
  width: '4px',
  background: theme.palette.info.light,
  borderRadius: 2,
  zIndex: 10,
  display: isActive ? 'block' : 'none',
})

export const getTribeTitleSx = (theme: Theme): SxProps => ({
  mr: theme.direction === 'rtl' ? 2 : 0,
  ml: theme.direction !== 'rtl' ? 2 : 0,
  color: theme.palette.text.secondary,
  fontSize: '18px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
})

export const getAddTribeButtonSx = (theme: Theme, isNavMini: boolean, isRTL: boolean): SxProps => ({
  alignSelf: 'flex-start',
  borderRadius: 1,
  minWidth: '40px',
  p: 0,
  ...(isRTL && { mr: 2 }),
  ...(!isRTL && { ml: 2 }),
  minHeight: '40px',
  height: '40px',
  color: theme.palette.info.light,
  border: `2px solid ${theme.palette.info.light}`,
})

export const AVATAR_SX = {
  position: 'absolute',
  left: {
    xs: 'calc(50% - 20px)',
    sm: 'calc(50% - 25px)',
    md: 'calc(50% - 35px)',
  },
  top: 0,
  width: { xs: '40px', sm: '60px', md: '80px', lg: '100px' },
  height: { xs: '40px', sm: '60px', md: '80px', lg: '100px' },
  background: '#1ACB7F',
  fontSize: { xs: '35px', sm: '40px', md: '60px', lg: '70px' },
  zIndex: 15,
}

export const inputNameStyles = (theme: Theme, isValid: boolean) => ({
  background: theme.palette.mode === 'light' ? (isValid ? '#75CF6D33' : '#fff') : '',
  border: theme.palette.mode === 'light' ? '' : '1px solid #fff',
  pt: 4,
  pb: 3,
  px: { xs: 0, sm: 3 },
  maxWidth: { xs: '300px', sm: '400px', md: '550px' },

  borderRadius: 2,
  '& fieldset': { border: 'none' },
  '.MuiInputBase-input': {
    fontSize: { sm: '30px', md: '30px', lg: '80px' },
    letterSpacing: '28px',
    fontWeight: '700',
  },
})
export const getButtonSx = (theme: Theme) => ({
  background: '#43D4DD33',
  color: '#43D4DD',
  fontSize: '1.5rem',
  m: '0 auto 24px',
  minWidth: '300px',
  '&:hover': {
    background: theme.palette.mode === 'light' ? '' : '#fff',
  },
})
