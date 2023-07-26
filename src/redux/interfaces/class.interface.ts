import { BaseSearchInterface } from "@utils";

import { ISchool } from "../slices/global";
import { User } from "./auth.interface";
import { ICourseElement } from "./content.interface";

export interface IClass {
  total_students?: number;
  total_courses?: number;
  description?: string;
  name: string;
  active?: boolean;
  students?: User[];
  setting: IClassSetting;
  school?: ISchool;
  courses?: ICourseElement[];
  avatar?: string;
  cover?: string;
  id?: string;
}

export interface IClassSetting {
  share_token_enable: boolean;
  request_join_enable: boolean;
  subscribe_enable: boolean;
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
