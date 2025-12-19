export type InviteType = 'ORGANIZATION' | 'SCHOOL' | 'CLASS'

export type InviteRole = 'OWNER' | 'ADMIN' | 'TEACHER' | 'STUDENT'

export interface InviteInfoResponse {
  email: string | null
  type: InviteType
  schoolId: string | null
  classId: string | null
  organizationId: string | null
  inviteLink: string
}

export const InviteStatus = {
  LoginNeeded: 'LOGIN_NEEDED',
  RegistrationNeeded: 'REGISTRATION_NEEDED',
  Success: 'SUCCESS',
} as const

export type InviteStatusType = (typeof InviteStatus)[keyof typeof InviteStatus]

export interface InviteLoginNeededResponse {
  status: typeof InviteStatus.LoginNeeded
  inviteType: InviteType
  email?: string | null
}

export interface InviteRegistrationNeededResponse {
  status: typeof InviteStatus.RegistrationNeeded
  inviteType: InviteType
  email?: string | null
}

export interface InviteSuccessResponse {
  status: typeof InviteStatus.Success
  schoolId?: string | null
  redirectUrl?: string | null
}

export type AcceptInviteResponse =
  | InviteRegistrationNeededResponse
  | InviteLoginNeededResponse
  | InviteSuccessResponse

export interface CreateInviteRequest {
  email?: string | null
  type: InviteType
  role: InviteRole
  organizationId?: string | null
  schoolId?: string | null
  classId?: string | null
}

export interface CreateInviteResponse {
  code: string
  redirectUrl: string | null
}

export interface AcceptInviteRequest {
  code: string
}

export interface CreateInviteTeacherToSchoolRequest {
  createdBy: string
  schoolId: string
  email: string
  redirectUrl?: string | null
}
