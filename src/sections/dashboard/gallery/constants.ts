import { alpha } from '@mui/system'

export const GALLERY_ITEM_TOP_ACTIONS_SX = {
  width: '100%',
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 2,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 0.5,
  pt: 0.5,
  pr: 1,
  pl: 2,
}
export const GALLERY_ITEM_PAPER_SX = {
  minWidth: '276px',
  borderRadius: '25px',
  overflow: 'hidden',
  border: '1px solid #43D4DD',
}

export const EXPAND_BTN_SX = {
  position: 'absolute',
  top: '60px',
  right: '20px',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: alpha('#43D4DD', 0.3),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const TEXT_SX = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  textWrap: 'nowrap',
  width: '250px',
}
