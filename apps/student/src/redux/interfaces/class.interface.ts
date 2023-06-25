import { BaseResponseInterface, BaseSearchInterface } from "@ct-nx/utils";
import { ISchool } from "../slices/global";
import { User } from "./auth.interface";
import { ICourse, ILesson } from "./content.interface";

export interface IClass {
  total_students?: number;
  total_courses?: number;
  description?: string;
  name: string;
  active?: boolean;
  students?: User[];
  school?: ISchool;
  courses?: ICourse[];
  avatar?: string;
  cover?: string;
  id?: string;
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

export interface IModule {
  active?: boolean;
  key: any;
  name: string;
  type: string;
  progress?: number;
  total_progress?: number;
  lessons: Array<ILesson & BaseResponseInterface>;
  description?: string;
}
