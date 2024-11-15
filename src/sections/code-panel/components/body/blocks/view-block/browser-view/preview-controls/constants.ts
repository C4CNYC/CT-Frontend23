import { addAlpha } from '@root/src/utils'

export const REFRESH_COLOR = '#43D4DD'
export const RUN_COLOR = '#75CF6D'
export const STOP_COLOR = '#EE467A'
export const PUBLISH_COLOR = '#FBDD3F'

export const btnStyles = (disabled: boolean, customColor: string) => ({
  border: disabled ? '1px solid #D9D9D9' : 'none',
  borderRadius: '30px',
  color: '#fff',
  gap: 1,
  px: 2,
  py: '0!important',
  background: !disabled ? customColor : '',
  '&.MuiButtonBase-root:hover': {
    background: !disabled ? addAlpha(customColor, 0.7) : '',
  },
})

export const PREVIEW_CONT_SX = {
  flexDirection: 'row',
  width: '100%',
  py: 0.5,
  pl: 7,
  pr: 1,
  gap: 1,
}
