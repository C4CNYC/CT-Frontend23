import * as Yup from 'yup'

import { AGE, LEVEL } from '@root/src/redux/services/interfaces/courseUnits.interface'

export interface DetailsTabProps {
  isEdit?: boolean
  id: string
  defaultValues?: FormValuesDetailsProps
  handleClose: () => void
  refetch: () => void
}

export interface CreateCourseDialogProps {
  defaultValues?: FormValuesGeneralProps
  children: React.ReactElement
  isEdit?: boolean
  id: string
  refetch: () => void
}

export interface FormValuesGeneralProps {
  name: string
  content_id: string
  level: LEVEL | ''
  customLevel: string
  age: AGE | ''
  customAge: string
  price: string
  description: string
  active: boolean
  public: boolean
  catalog: boolean
  initial_enrolled: number
  initial_likes: number
  initial_stars: number
  skills: []
  audience: string
  for_teachers: string
}

export const CreateCourseSchema = (translate: (t: string) => string) =>
  Yup.object().shape({
    name: Yup.string().required(translate('required_name')),
    level: Yup.string().required(translate('required_level')),
    price: Yup.string().required(translate('required_price')),
    description: Yup.string().required(translate('required_description')),
    content_id: Yup.string().required(translate('required_content_id')),
    initial_likes: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(translate('required_initial_likes')),
    initial_stars: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(translate('required_initial_stars')),
    initial_enrolled: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(translate('required_initial_enrolled')),
    skills: Yup.array(),
  })

export const CreateDetailsSchema = () =>
  Yup.object().shape({
    level: Yup.mixed<LEVEL>(),
    customLevel: Yup.string(),
    age: Yup.mixed<AGE>(),
    customAge: Yup.string(),
  })

export interface FormValuesDetailsProps {
  level: LEVEL | ''
  customLevel: string
  age: AGE | ''
  customAge: string
  audience: string
  for_teachers: string
}

export const UPLOADED_FILE_CLOSE_SX = {
  position: 'absolute',
  right: '5px',
  top: '5px',
  zIndex: 10,
  width: '20px',
  height: '20px',
  p: 0,
}

export const UPLOADED_TEXT_SX = {
  mt: 1,
  mb: -1,
  mx: 'auto',
  display: 'block',
  textAlign: 'center',
  color: 'text.secondary',
}

export const CONTROL_BTNS_BOX_SX = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 2,
  pt: 2,
  mt: 'auto',
}

export const DIALOG_TITLE_SX = {
  pb: 1,
  pt: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const TAB_PANEL_SX = {
  display: 'flex',
  flexDirection: 'column',
  py: { xs: 1, sm: 3 },
  px: { xs: 2, sm: 3 },
  minHeight: 600,
  height: '100%',
  overflowY: 'auto',
}
