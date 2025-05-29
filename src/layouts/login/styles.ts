import { Link } from '@mui/material'
import { styled } from '@mui/material/styles'

import { bgBlur } from '@/utils'

export const StyledRoot = styled('main')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  position: 'relative',
  backgroundColor: theme.palette.mode === 'light' ? '#cbfcff' : 'rgba(54, 73, 84, 1)',
}))

export const StyledSection = styled('div')(({ theme }) => ({
  display: 'none',
  position: 'relative',
  backgroundColor: '#cbfcff',
  ...bgBlur({
    color: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default,
  }),
  margin: 16,
  borderRadius: '8px',
  [theme.breakpoints.up('md')]: {
    padding: '45px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}))

export const StyledLogoCont = styled('div')(() => ({
  position: 'absolute',
  top: '24px',
  left: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const StyledLogoContMobile = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '14px',
  left: '8px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))

export const StyledSectionBg = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  transform: 'scaleX(-1)',
}))

export const StyledContent = styled('div')(({ theme }) => ({
  width: '100%',
  margin: 'auto',
  display: 'flex',
  borderRadius: '8px',
  justifyContent: 'center',
  padding: theme.spacing(3),
  ...bgBlur({ color: theme.palette.background.default }),
  [theme.breakpoints.up('sm')]: {
    maxWidth: '460px',
  },
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    padding: theme.spacing(5),
    width: 480,
  },
}))

export const StyledSwitcher = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 10,
  bottom: 10,
  padding: '10px 10px 0 0',
  alignSelf: 'flex-start',
  maxWidth: 'max-content',
  [theme.breakpoints.up('md')]: {
    top: '0',
    right: '0',
    bottom: 'auto',
    left: 'auto',
  },
}))

export const StyledLink = styled(Link)(({ theme }) => ({
  position: 'absolute',
  bottom: '10px',
  color: theme.palette.text.secondary,
  right: 'calc(50% - 280px)',
  [theme.breakpoints.down('md')]: {
    right: 'calc(50% - 35px)',
  },
}))
