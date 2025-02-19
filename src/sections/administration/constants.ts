import { HomePageType } from '@root/src/redux/services/enums/administration.enum'

export const HELPER_IMG_TEXT = {
  mt: 1,
  mb: -1,
  mx: 'auto',
  display: 'block',
  textAlign: 'center',
  color: 'text.secondary',
}
export const UPLOAD_IMG_BTN = {
  position: 'absolute',
  right: '5px',
  top: '5px',
  zIndex: 10,
  width: '20px',
  height: '20px',
  p: 0,
}
export const TAB_SX = {
  p: { xs: 2, sm: 3 },
  minWidth: '350px',
  minHeight: '350px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}

export interface FormValuesProps {
  name: string
  slug: string
  domain: string[] | string
  home_page_type: HomePageType
}

export interface FormValuesPropsR {
  name: string
  slug: string
  domain: string[]
  home_page_type: HomePageType
}
