import { SxProps } from '@mui/material'

export const BRIEFING = '#0198ED'
export const CUSTOM = '#A7B2B7'
export const CHALANGES = '#FBDD3F'

export const GREEN_DOT_SX = {
  position: 'absolute',
  top: -10,
  right: -10,
  width: 20,
  height: 20,
  borderRadius: '100%',
  backgroundColor: '#00AB55',
  boxShadow: 3,
}

export const getLessonItemPaperSx = (
  chooseColor: () => string,
  isSlideActive: boolean,
  sx?: SxProps
): SxProps => ({
  cursor: 'pointer!important',
  display: 'flex',
  p: '5px 5px 5px 5px',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  border: `${isSlideActive ? '3px' : '2px'} solid ${chooseColor()}`,
  boxShadow: !isSlideActive
    ? `0px 5px 5px -3px rgba(145, 158, 171, 0.2),
              0px 8px 10px 1px rgba(145, 158, 171, 0.14),
              0px 3px 14px 2px rgba(145, 158, 171, 0.12)`
    : `0px 5px 5px -3px rgba(145, 158, 171, 0.6),
0px 8px 10px 1px rgba(145, 158, 171, 0.5), 
0px 3px 14px 2px rgba(145, 158, 171, 0.4)`,
})
