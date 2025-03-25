import { SxProps, Theme } from '@mui/material'
import * as Yup from 'yup'

export interface TenantFormValuesProps {
  email: string
  password: string
  name: string
  surname: string
  city: string
  country: string
  orgType: OrgType
  studentCountCurrent: number
  studentCountExpected: number
  brandName: string
  subdomain: string
  logo?: File
  logoMini?: File
  note: string
}

export enum OrgType {
  MIDDLE_SCHOOL = 'Middle School',
  HIGH_SCHOOL = 'High School',
  NGO = 'NGO',
  TRAINING_BUSINESS = 'Training Business',
  OTHER_BUSINESS = 'Other Business',
  GOV = 'Gov Department',
  UNIVERSITY = 'University',
  OTHER = 'Other',
}
export const STEPS = ['owner', 'ownerInfo', 'orgInfo', 'brandInfo', 'logos', 'note']

export const createLoginSchema = (translate: (key: string) => string) =>
  Yup.object().shape({
    email: Yup.string()
      .required(translate('required_email'))
      .email(translate('must_be_valid_email'))
      .trim(),
    password: Yup.string()
      .min(10, translate('required_password_length'))
      .required(translate('required_password')),
    name: Yup.string().required(translate('required_name')).trim(),
    surname: Yup.string().required(translate('required_surname')).trim(),
    city: Yup.string().required(translate('required_city')).trim(),
    country: Yup.string().required(translate('required_country')).trim(),
    orgType: Yup.mixed<OrgType>()
      .oneOf(Object.values(OrgType))
      .required(translate('required_org_type')),
    studentCountCurrent: Yup.lazy((value) =>
      value === '' ? Yup.string() : Yup.number().typeError('must_be_a_number')
    ),
    studentCountExpected: Yup.lazy((value) =>
      value === '' ? Yup.string() : Yup.number().typeError('must_be_a_number')
    ),
    brandName: Yup.string().required(translate('required_brand_name')).trim(),
    subdomain: Yup.string().required(translate('required_brand_subdomain')).trim(),
    logo: Yup.string(),
    logoMini: Yup.string(),
    note: Yup.string(),
  })

export const styledRegisterInput = (theme: Theme, sx?: SxProps): SxProps => ({
  fontSize: 25,
  color: theme.palette.mode === 'light' ? '#000' : '#fff',
  '& .MuiInputBase-root': {
    height: '52px',
    background: theme.palette.mode === 'light' ? '#efefef' : 'initial',
  },
  '& fieldset': {
    border: theme.palette.mode === 'light' ? 'none' : '',
  },
  '& input:-webkit-autofill': {
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': theme.palette.mode === 'light' ? '#000' : '#fff',
    transition: 'background-color 5000s ease-in-out 0s',
    boxShadow: `inset 0 0 .1px .1px ${
      theme.palette.mode === 'light' ? theme.palette.grey[200] : 'rgba(0, 0, 0, 0)'
    }`,
  },
  ...sx,
})

export const SUBMIT_BTN_SX = {
  background: '#43D4DD33',
  color: '#43D4DD',
  fontSize: '1.5rem',
  width: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: '#43D4DD80',
    color: '#2FAAB3',
    boxShadow: '0px 2px 14px rgba(67, 212, 221, 0.6)',
  },
}

export const SKIP_BTN_SX = {
  color: '#43D4DD',
  width: '100%',
  padding: '0 15px',
  maxWidth: '100px',
  m: '-8px auto 0',
  '&:hover': {
    background: 'none',
    color: '#2FAAB3',
  },
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
export const HELPER_IMG_TEXT = {
  mt: 1,
  mb: -1,
  mx: 'auto',
  display: 'block',
  textAlign: 'center',
  color: 'text.secondary',
}
