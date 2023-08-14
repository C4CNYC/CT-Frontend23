import { BaseSearchInterface } from "@utils";

import { IStudent } from "../services/interfaces/user.interface";
import { ISchool } from "../slices/global";
import { ICourseElement } from "./content.interface";

export interface IClass {
  description?: string;
  name: string;
  active?: boolean;
  students?: IStudent[];
  setting: IClassSettings;
  school?: ISchool;
  courses?: ICourseElement[];
  avatar?: string;
  cover?: string;
  id: string;
  mentors?: IMentor[];
  total_students?: string;
  total_courses?: string;
}

export interface IClassSettings {
  request_join_enable: boolean;
  share_token: string;
}

export interface IMentor {
  id: string;
  email: string;
  role: string;
  first_name: string;
  avatar: string | null;
  last_name: string;
  verified: boolean;
  active: boolean;
}

export interface ClassSearchParams extends BaseSearchInterface {
  name?: string;
}

export interface IAddCourseToClass {
  id: string;
  course_id: string;
}

export interface IRemoveCourseFromClass {
  id: string;
  course_id: string;
}
