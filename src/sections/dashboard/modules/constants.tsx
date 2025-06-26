import * as Yup from 'yup'

import { AGE, GRADING, LEVEL } from '@root/src/redux/services/interfaces/courseUnits.interface'

export interface FormValuesDetailsProps {
  level: LEVEL | ''
  customLevel: string
  age: AGE | ''
  customAge: string
  brief: string
  audience: string
  grading: GRADING
}
export interface DetailsTabProps {
  id: string
  defaultValues?: FormValuesDetailsProps
  handleClose: () => void
  refetch?: () => void
}

export const CreateDetailsSchema = () =>
  Yup.object().shape({
    level: Yup.mixed<LEVEL>(),
    customLevel: Yup.string(),
    age: Yup.mixed<AGE>(),
    customAge: Yup.string(),
    grading: Yup.mixed<GRADING>(),
  })

export const CONTROL_BTNS_BOX_SX = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 2,
  pt: 4,
  mt: 'auto',
}
export const DIALOG_ACTIONS_SX = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 2,
}
export const TAB_PANEL_SX = {
  width: { xs: '300px', sm: '350px' },
  minWidth: '300px',
  height: '260px',
}
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
  minWidth: { xs: '320px', sm: '370px' },
  minHeight: '320px',
}
