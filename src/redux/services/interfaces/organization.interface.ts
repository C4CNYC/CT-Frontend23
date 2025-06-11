import { OrgType } from '@/sections/auth/tenant-creation/constants'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

export interface OrganizationResponce extends BaseResponseInterface {
  title: string
  name: string
  email?: string
  url: string
  address: string
  cover?: string
  avatar?: string
}

export interface ContactsResponce extends BaseResponseInterface {
  email: string
  title: string
  name: string
  phone: string
}

export interface SettingsResponce extends BaseResponseInterface {
  language: string
  marketplace_content_allowed: boolean
  github_login_allowed: boolean
  google_login_allowed: boolean
  invite_only: boolean
  chat_allowed: boolean
  gallery_allowed: boolean
  global_gallery_allowed: boolean
}

export interface CustomizationResponce extends BaseResponseInterface {
  description: string
  welcome_message: string
  custom_group_name: string
  theme: Record<string, number | string>
}

export interface IContacts {
  email: string
  title: string
  name: string
  phone: string
}

export interface ISettings {
  language: string
  marketplace_content_allowed: boolean
  github_login_allowed: boolean
  google_login_allowed: boolean
  invite_only: boolean
  chat_allowed: boolean
  gallery_allowed: boolean
  global_gallery_allowed: boolean
}

export interface ICustomization {
  description: string
  welcome_message: string
  custom_group_name: string
  theme: {
    primaryColor: string
    secondaryColor: string
    alternativeColor: string
  }
}

export interface ISubmitInvite {
  password: string
  inviteId: string
}

export interface ISendInvite {
  email: string
  role: string
}

export interface OrganizationListResponce {
  data: OrganizationResponce[]
  meta: Record<string, unknown>
}

export interface OrganizationRequest {
  title: string
  email: string | null
  url: string
  address: string
}

export interface ITenantLogo {
  userId: string
  file: File | string
}

export interface ITenantLogoResponse {
  message: string
}

export interface ITenantUpdateInfo {
  name: string
  surname: string
  city: string
  country: string
  org_type: OrgType
  student_count_current: number
  student_count_expected: number
  brandName: string
  subdomain: string
  logo?: File
  logoMini?: File
  note: string
}

export interface ITenantBrandNameCheck {
  brandName: string
}

export interface ITenantSubdomainCheck {
  subdomain: string
}

export interface ITenantBrandNameAndSubdomainResponse {
  message: string
  isAvailable: boolean
}
