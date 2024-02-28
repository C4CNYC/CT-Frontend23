import { type SxProps } from '@mui/system'

export const HEADER_HEIGHT = 64
export const DIVIDER_HEIGHT = 3
export const BOTTOM_LIST_HEIGHT = 176

export const getStackCodeBoxSx = (height: number | null | undefined, isOpen: boolean) => ({
  position: 'fixed',
  maxHeight: height == null ? '100%' : height,
  width: 'max-content',
  top: 50,
  right: isOpen ? 300 : 85,
  display: 'flex',
  flexWrap: 'wrap-reverse',
  gap: '12px',
  transition: 'right .5s',
})

export const ICON_SX = {
  width: '30px',
  height: '30px',
  color: '#616161',
}

export const DIVIDER_SX = {
  padding: '0 8px',
  borderColor: '#F0F2F7',
  height: '3px',
  width: 'calc(100% - 16px)',
  margin: '0 auto',
}

export const DIVIDER_SX_BOTTOM = {
  ...DIVIDER_SX,
  position: 'absolute',
  bottom: '108px',
  left: '8px',
}

export const LIST_SX = {
  paddingTop: '0px',
  pb: 0,
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
}

export const MAIN_LIST = {
  paddingTop: '0px',
  height: 'auto',
}

export const STACK_SX = {
  padding: 0,
  width: '100%',
  overflowY: 'auto',
  // maxHeight: `calc(100% - ${HEADER_HEIGHT}px - ${DIVIDER_HEIGHT * 2}px)`,
}

export const getDrawerSx = (isOpen: boolean, isRealtimeCodeHidden: boolean): SxProps => {
  return {
    zIndex: 1200,
    width: 60,
    minHeight: '86vh',
    position: 'absolute',
    right: 0,
    top: '48%',
    transform: 'translateY(-48%)',
    transition: 'margin-right .3s',
    marginRight: !isRealtimeCodeHidden ? 0 : '-70px',
    '& .MuiDrawer-paper': {
      paddingBottom: '110px',
      transition: 'right .5s',
      width: 260,
      boxSizing: 'border-box',
      maxHeight: '100%',
      position: 'absolute',
      minHeight: '100%',
      right: isOpen ? 0 : -200,
      left: 'auto',
      background: '#DFEEF7',
      boxShadow: '-2px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      borderRadius: '25px 0px 0px 25px',
      overflow: 'visible',
    },
  }
}
