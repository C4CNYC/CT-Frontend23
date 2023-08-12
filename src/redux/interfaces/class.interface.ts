import { BaseSearchInterface } from "@utils";

import { IStudent } from "../services/interfaces/user.interface";
import { ISchool } from "../slices/global";
import { ICourseElement } from "./content.interface";

export interface IClass {
  total_students?: number;
  total_courses?: number;
  description?: string;
  name: string;
  active?: boolean;
  students?: IStudent[];
  setting: IClassSetting;
  school?: ISchool;
  courses?: ICourseElement[];
  avatar?: string;
  cover?: string;
  id?: string;
  mentors?: IMentor[];
}

export interface IClassSetting {
  setting_share_token_enable: boolean;
  setting_request_join_enable: boolean;
  setting_subscribe_enable: boolean;
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
