import { Theme } from '@mui/material'

export const getSeeMoreBtnSx = (theme: Theme) => ({
  width: 130,
  justifyContent: 'start',
  fontSize: '1rem',
  color: theme.palette.mode === 'light' ? '#364954' : '#FFF',
  '&:hover': {
    background: 'none',
  },
})

export const COURSE_INFO_IMAGE_SX = {
  flexShrink: 0,
  width: '250px',
  height: '250px',
  m: '0 auto',
  borderRadius: '25px',
}

export const getCourseInfoWrapperSx = (theme: Theme) => ({
  flexDirection: {
    xs: 'column-reverse',
    sm: 'row',
    md: 'row',
  },
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  px: 8,
  py: 4,
  mb: 5,
  background: theme.palette.mode === 'light' ? '#ECF4FF' : theme.palette.background.paper,
  borderRadius: 2,
  [theme.breakpoints.down(800)]: {
    px: 2,
    py: 3,
    mb: 3,
  },
})
