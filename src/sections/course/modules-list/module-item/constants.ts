import { Theme } from '@mui/system'

export const LIGHT_BOX_ICON_BTN = {
  opacity: 0,
  position: 'absolute',
  width: '50px',
  height: '50px',
  top: 'calc(50% - 25px)',
  left: 'calc(50% - 25px)',
  zIndex: 2,
  background: 'rgba(225, 225, 225, 0.6)',
  color: '#fff',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all .2s linear',
}

export const getModuleItemCont = (theme: Theme) => ({
  background: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper,
  position: 'relative',
  zIndex: 5,
  borderRadius: '25px',
  cursor: 'pointer',
})

export const getImgSx = (img: string | null | undefined, theme: Theme) => ({
  borderRadius: '25px 25px 0 25px',
  overflow: 'hidden',
  width: '150px',
  height: '100%',
  background: `no-repeat url(${img ?? '/assets/projects/bg1.png'}) center / cover`,
  position: 'relative',
  [theme.breakpoints.down(800)]: {
    m: 2,
    width: '200px',
    minHeight: '200px',
  },
})

export const INFO_CONT_SX = {
  p: 2,
  pr: 3,
  justifyContent: 'space-between',
  overflow: 'auto',
  width: '100%',
}

export const getBtnSx = (isMobile: boolean, lastVisited: boolean, theme: Theme) => ({
  display: 'inline-flex',
  alignSelf: isMobile ? 'flex-end' : 'flex-start',
  gap: 0.3,
  fontSize: '1.0rem',
  color: theme.palette.mode === 'light' ? '#364954' : '#fff',
  background: lastVisited ? '-webkit-linear-gradient(150deg,#61F3F3,#00B8D9)' : '',
  '-webkit-background-clip': lastVisited ? 'text' : '',
  '-webkit-text-fill-color': lastVisited ? 'transparent' : '',
  '&:hover': {},
})

export const seeMoreBtn = (isMobile: boolean) => ({
  ml: isMobile ? 0 : 3,
  mt: isMobile ? 2 : 0,
  color: 'inherit',
  alignSelf: isMobile ? 'flex-start' : 'center',
})
