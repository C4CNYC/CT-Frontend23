import { BaseResponseInterface } from "src/utils/baseResponce.interface";

export interface SchoolResponce extends BaseResponseInterface {
  name: string;
  city: string;
  country: string;
}

export interface SchoolListResponce {
  data: SchoolResponce[];
  meta: Record<string, unknown>;
}

export interface SchoolRequest {
  name?: string;
}

export interface OrganizationSchoolRequest {
  name: string;
  city: string;
  country: string;
}

export interface SchoolProfile {
  email?: string;
  name?: string;
  school_id: string;
  country?: string;
  address?: string;
  city?: string;
  active?: boolean;
  phone?: string;
  about?: string;
  socials?: [];
  student_count?: number;
  teacher_count?: number;
}

export interface SchoolSocials {
  id: string;
  link: string;
  name?: string;
  type: string;
}

export interface SchoolSettings {
  school_id: string;
  language?: string;
  marketplace_content_allowed: boolean;
  github_login_allowed: boolean;
  google_login_allowed: boolean;
  invite_only: boolean;
  chat_allowed: boolean;
  gallery_allowed: boolean;
  global_gallery_allowed: boolean;
}

export interface SchoolContacts {
  school_id: string;
  email: string;
  name: string;
  phone: string;
  technical_email: string;
  technical_name: string;
  technical_phone: string;
  billing_email: string;
  billing_name: string;
  billing_phone: string;
}

export interface OrganizationSchoolResponse extends BaseResponseInterface {
  name: string;
  city: string;
  country: string;
}

export interface AddTeacherRequest {
  school_id: string;
  user_id: string;
}

export interface DeleteMemberRequest {
  user_id: string;
}

export interface ClassListReponce extends BaseResponseInterface {
  name: string;
}

export interface ClassResponce extends BaseResponseInterface {
  name: string;
}
export interface ClassRequest {
  name: string;
  schoolId: string;
}
