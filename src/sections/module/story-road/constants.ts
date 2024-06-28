import { SxProps, Theme } from '@mui/material'

export const getDescriptionBoxSx = (theme: Theme) => ({
  bgcolor: theme.palette.mode === 'light' ? '#FFEDF2' : '#212B36',
  p: 1,
  borderRadius: 1,
  position: 'relative',
  zIndex: 1,
})

export const DESCRIPTION_GRADIENT_TEXT_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '16px',
  color: '#0198ED',
  background: 'linear-gradient(#7A16C9, #F618D3B5)',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

export const LESSON_TIME_SX = {
  color: 'current',
  display: 'flex',
  alignItems: 'center',
  fontSize: '16px',
  gap: '10px',
}

export const getRoadBoxSx = (
  firstItem: boolean,
  lastItem: boolean,
  oddItem: boolean,
  compleatedColor: string
): SxProps => ({
  display: 'flex',
  alignItems: 'flex-start',
  pl: '200px',
  mt: firstItem ? 0 : '-155px',
  height: !lastItem ? '400px' : '100px',
  background: lastItem
    ? ''
    : oddItem
    ? `top 50px left 270px / 140px url(/assets/projects/roadRight${compleatedColor}.svg) no-repeat`
    : `top 30px left 60px / 140px url(/assets/projects/roadLeft${compleatedColor}.svg) no-repeat`,
})

export const PROGRES_BOX_SX = {
  display: 'flex',
  alignSelf: 'flex-start',
  position: 'relative',
  background: 'linear-gradient(180deg, rgba(168, 172, 169, 0.83) 0%, rgba(60, 63, 61, 0.65) 100%)',
  borderRadius: '50%',
}

export const getIconWrapperSx = (compleated: boolean): SxProps => ({
  position: 'absolute',
  top: '12px',
  left: '12px',
  background: '#fff',
  borderRadius: '50%',
  width: '46px',
  height: '46px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pt: compleated ? 0 : '2px',
  pr: compleated ? 0 : '4px',
})

export const getButtonSx = (lastActive: boolean | undefined): SxProps =>
  lastActive
    ? {
        background: 'top 5px left / 110px url(/assets/projects/lastActive.png) no-repeat',
        color: '#fff',
        borderRadius: 3,
        mt: 2,
        ml: -3,
        minHeight: '76px',
        '&:hover': {
          background: 'top 5px left / 110px url(/assets/projects/lastActive.png) no-repeat',
          boxShadow: 'none',
        },
      }
    : {
        background: 'rgba(196, 196, 196, .2)',
        color: '#616161',
        borderRadius: 3,
        mt: 1,
        ml: 0,
        '&:hover': {
          background: 'rgba(196, 196, 196, .2)',
          boxShadow: 3,
        },
      }

export const getSeeMoreBtnSx = (theme: Theme): SxProps => ({
  gap: 1,
  alignSelf: 'flex-start',
  color: theme.palette.mode === 'light' ? '#364954' : '#fff',
  fontWeight: 400,
  px: 1,
  '&:hover': {
    background: 'none',
  },
})

export const getMobileRoadBoxSx = (
  lastItem: boolean,
  firstItem: boolean,
  compleatedColor: string
): SxProps => ({
  display: 'flex',
  alignItems: 'flex-start',
  height: !lastItem ? '280px' : '100px',
  mt: firstItem ? 0 : '-30px',
  pl: '20px',
  background: !lastItem
    ? `top 65px left 5px / 100px url(/assets/projects/roadMobile${compleatedColor}.svg) no-repeat`
    : '',
})

export const getMobileButtonSx = (lastActive: boolean | undefined): SxProps =>
  lastActive
    ? {
        background: 'top 5px left / 110px url(/assets/projects/lastActive.png) no-repeat',
        color: '#fff',
        minHeight: '76px',
        '&:hover': {
          background: 'top 5px left / 110px url(/assets/projects/lastActive.png) no-repeat',
          boxShadow: 'none',
        },
        ml: 1,
      }
    : {
        background: 'rgba(196, 196, 196, .2)',
        color: '#616161',
        borderRadius: 3,
        mt: 2,
        ml: 1,
        '&:hover': {
          background: 'rgba(196, 196, 196, .5)',
          boxShadow: 'none',
        },
      }
