import { SxProps, Theme } from '@mui/system'

export const getBoxStyles = (isTabletAndMobile: boolean, theme: Theme): SxProps => ({
  flex: '1 1 0px',
  position: 'relative',
  height: isTabletAndMobile ? '100dvh' : 'calc(100vh - 68px)',
  borderWidth: isTabletAndMobile ? 'none' : '3px',
  borderStyle: isTabletAndMobile ? 'none' : 'solid',
  borderColor:
    theme.palette.mode === 'light' ? 'rgb(234, 234, 235)' : theme.palette.background.neutral,
  background: theme.palette.mode === 'light' ? '' : '',
  overflow: 'hidden',
  borderRadius: isTabletAndMobile ? '0 ' : 2,
  paddingBottom: isTabletAndMobile ? 'env(safe-area-inset-bottom)' : 0,
})

export const getButtonSx = (isDesktop: boolean): SxProps => ({
  display: isDesktop ? 'flex' : 'none',
  width: 30,
  height: 30,
  p: 0.2,
  minWidth: '0',
  color: '#5FD0D5',
  zIndex: 20,
  '&:hover': {
    background: 'none',
  },
})

export const getButtonWrapperSx = (isDesktop: boolean, isLeft: boolean = false): SxProps => ({
  display: isDesktop ? 'flex' : 'none',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  right: 0,
  left: isLeft ? 0 : 'none',
  zIndex: 10,
  background: 'rgba(238, 70, 122, 0.20)',
  width: 32,
  height: 32,
  borderBottomLeftRadius: isLeft ? 0 : '50%',
  borderBottomRightRadius: isLeft ? '50%' : 0,
  borderBottom: '3px solid rgb(234, 234, 235)',
  borderRight: isLeft ? '3px solid rgb(234, 234, 235)' : 'none',
  borderLeft: isLeft ? 'none' : '3px solid rgb(234, 234, 235)',
})
