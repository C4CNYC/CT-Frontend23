import { type SxProps, type Theme } from '@mui/system'

export const getButtonSx = (theme: Theme): SxProps => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
  p: 0,
  color: theme.palette.mode === 'light' ? 'initial' : '#fff',
  fontWeight: '400',
  '&:hover': {
    background: 'none',
  },
  width: '175px',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
})

export const GetTypSx = (theme: Theme): SxProps => ({
  textOverflow: 'ellipsis',
  overflow: ' hidden',
  textTransform: 'none',
  color: theme.palette.text.disabled,
  maxWidth: { md: '300px', lg: '350px', xl: '500px' },
})
