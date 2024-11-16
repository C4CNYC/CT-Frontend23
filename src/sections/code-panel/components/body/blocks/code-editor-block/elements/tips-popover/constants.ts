export const DESKTOP_POPPER_WIDTH = '20%'
export const MOBILE_POPPER_WIDTH = '60%'

export const BOX_STYLES = {
  border: '1px solid #FBDD3F',
  background: '#155275',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  pt: 1,
  px: 2,
  minHeight: '100px',
  overflowY: 'auto',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  transition: 'all .2s ease-in',
}

export const POPOVER_VERTICAL = 30
export const POPOVER_HORIZONTAL = -260

export const TYP_COLOR = { color: '#fff' }

export const BUTTON_STYLES = {
  alignSelf: 'flex-end',
  background: 'rgba(0, 0, 0, 0.3)',
  borderRadius: '25px',
  color: '#FBDD3F',
  fontWeight: 400,
  my: 1,
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.2)',
  },
}
