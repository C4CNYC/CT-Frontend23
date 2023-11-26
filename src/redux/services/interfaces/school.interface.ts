import { BaseResponseInterface, BaseSearchInterface } from "@utils";

import { SchoolType } from "../enums/school-type.enum";

export interface ISchool extends BaseResponseInterface {
  name: string;
  city: string;
  avatar: string;
  cover: string;
  country: string;
  type: SchoolType | null;
  zip: string | null;
  id: string;
}

export interface ISchoolSearchParams extends BaseSearchInterface {
  name?: string;
}

export interface OrganizationSchoolRequest {
  name: string;
  city: string;
  country: string;
}
export interface ISchoolSummary {
  id?: string;
  email?: string;
  name?: string;
  country?: string;
  address?: string;
  cover?: string;
  avatar?: string;
  city?: string;
  active?: boolean;
  phone?: string;
  about?: string;
  socials?: [];
  student_count?: number;
  teacher_count?: number;
}
export interface SchoolProfile {
  email?: string;
  name?: string;
  schoolId?: string;
  country?: string;
  address?: string;
  cover?: string;
  avatar?: string;
  city?: string;
  active?: boolean;
  phone?: string;
  about?: string;
  socials?: [];
  type?: SchoolType;
  zip?: string;
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
  schoolId: string;
  language?: string;
  marketplace_content_allowed: boolean;
  github_login_allowed: boolean;
  google_login_allowed: boolean;
  invite_only: boolean;
  last_name_only: boolean;
  chat_allowed: boolean;
  gallery_allowed: boolean;
  global_gallery_allowed: boolean;
}

export interface SchoolContacts {
  schoolId: string;
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
  schoolId: string;
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
  description: string;
  schoolId: string;
  classId: string;
  cover: string;
}
