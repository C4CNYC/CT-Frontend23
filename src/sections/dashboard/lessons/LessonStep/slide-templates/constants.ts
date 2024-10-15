export const DRAWER_WIDTH_PADDING = 120
export const MOBILE_DRAWER_WIDTH_PADDING = 28

export const CLOSE_BTN_POSITION = { position: 'absolute', right: '8px', top: '8px' }
export const MENU_BTN_POSITION = { position: 'absolute', top: '8px', left: '8px', zIndex: 2000 }

export const TABS_SX = {
  borderRight: 1,
  borderColor: 'divider',
  pt: { xs: 5, md: 2 },
  '& .MuiTab-root.Mui-selected': {
    color: 'primary.main',
  },
}
export const ANIMATION_CONT_SX = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
}

export const BACKDROP_CONT_SX = {
  background: 'rgba(0, 0, 0, 0.8)',
  minHeight: '100%',
  justifyContent: 'space-between',
  py: 2,
  px: { xs: 1, md: 3 },
}
export const TYPO_BACKDROP_SX = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '3',
  WebkitBoxOrient: 'vertical',
  color: '#fff',
}
