import { Theme } from '@mui/material'

export const getParentStackSx = (isLight: boolean, isOpenHeader: boolean) => ({
  bgcolor: isLight ? '#F2F2F2' : '',
  height: isOpenHeader ? 'calc(100% - 120px)' : 'calc(100% - 86px)',
  width: 'calc(100% - 16px )',
  borderRadius: '16px',
  p: 1,
  m: 1,
})
export const getSkeletonSx = (isLight: boolean) => ({
  bgcolor: isLight ? '#D9D9D9' : '',
})
export const getStackBottonSx = (isLight: boolean, theme: Theme) => ({
  backgroundColor: isLight ? theme.palette.background.default : theme.palette.background.neutral,
  width: '100%',
  height: 'calc(100% - 24px)',
  borderRadius: '10px',
})

export const AVAILABLE_TYP_SX = {
  mt: '78px',
  mb: '10px',
  textAlign: 'center',
  color: '#c4c4c4',
  fontSize: '1.1rem',
}
export const COMMONT_TEXT_SX = {
  textAlign: 'center',
  color: '#c4c4c4',
  fontSize: '1.1rem',
  maxWidth: '300px',
  m: '25px auto',
}

export const CODING_TYP_SX = {
  m: '0px auto',
  textAlign: 'center',
  color: '#c4c4c4',
  fontSize: '1.1rem',
  maxWidth: '250px',
}

export const HEADER_SKELETON_SX = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: '5px',
  pl: '30px',
}
