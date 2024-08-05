import { SxProps } from '@mui/system'

export const ACC_SUMMARY_SX = { pl: '10px' }
export const LIST_SX = { p: 0, pl: '10px', pr: '10px' }
export const DIVIDER_SX = { height: 2 }

export const getButtonSx = (isCurrentLesson: boolean, isLight: boolean): SxProps => ({
  background: isCurrentLesson ? (isLight ? '#ebe5e5' : '#161C24') : 'inherit',
  cursor: 'pointer',
  display: 'flex',
})

export const getTypSx = (isMobile: boolean): SxProps => ({
  textOverflow: 'ellipsis',
  width: isMobile ? '220px' : '300px',
})
