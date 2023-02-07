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
  name?: string;
}

export interface OrganizationSchoolRequest {
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
