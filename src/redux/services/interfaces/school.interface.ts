import { BaseResponseInterface } from "src/utils/baseResponce.interface";

export interface SchoolResponce extends BaseResponseInterface {
  name: string;
  city: string;
  country: string;
}

export interface SchoolListResponce {
  data: SchoolResponce[];
  meta: {};
}

export interface SchoolRequest {
  id: string;
  name?: string;
}

export interface OrganizationSchoolRequest {
  org_id: string;
  name: string;
  city: string;
  country: string;
}
export interface OrganizationSchoolResponse extends BaseResponseInterface {
  name: string;
  city: string;
  country: string;
}

export interface AddTeacherRequest {
  org_id: string;
  school_id: string;
  user_id: string;
}

export interface ClassListReponce extends BaseResponseInterface {
  name: string;
}
