import { Theme } from '@mui/material'

export const getSeeMoreBtnSx = (theme: Theme) => ({
  width: 130,
  justifyContent: 'start',
  fontSize: '1rem',
  gap: 1,
  color: theme.palette.mode === 'light' ? '#364954' : '#FFF',
  whiteSpace: 'nowrap',
  '&:hover': {
    background: 'none',
  },
})

export const COURSE_INFO_IMAGE_SX = {
  flexShrink: 0,
  width: '150px',
  height: '150px',
  m: '0 auto',
  borderRadius: '25px',
  position: { sx: 'initial', md: 'absolute' },
  right: '16px',
  top: '16px',
}

export const getCourseInfoWrapperSx = (theme: Theme) => ({
  position: 'relative',
  flexDirection: {
    xs: 'column',
    sm: 'column',
    md: 'column',
  },
  justifyContent: 'space-between',
  pl: 2,
  pr: { xs: 2, md: '182px' },
  py: 2,
  mb: 5,
  background: theme.palette.mode === 'light' ? '#ECF4FF' : theme.palette.background.paper,
  borderRadius: 2,
  [theme.breakpoints.down(800)]: {
    px: 2,
    py: 3,
    mb: 3,
  },
})
