import { BaseSearchInterface } from "src/utils/baseRequest.intergace";
import { LessonContentType } from "../enums/lesson-content-type.enum";

export interface IModule {
  active: boolean;
  name: string;
  description: string;
  data: [];
}

export interface ILesson {
  data: [];
  active: boolean;
  name: string;
  description: string;
}

export interface ICourse {
  name: string;
  level: string;
  price: string;
  description: string;
  active: boolean;
  draft?: boolean;
}

export interface ILessonContent {
  body: string;
  type: LessonContentType;
}

export interface IAddLessonToModule {
  id: string;
  lesson_id: string;
}

export interface IRemoveLessonFromModule {
  id: string;
  lesson_id: string;
}

export interface IModuleCreate {
  active: boolean;
  name: string;
  description: string;
}

export interface ILessonCreate {
  active: boolean;
  name: string;
  description: string;
}

export interface IModulesSearchParams extends BaseSearchInterface {
  name?: string;
  course_id?: string;
}

export interface ILessonSearchParams extends BaseSearchInterface {
  name?: string;
  module_id?: string;
}

export interface ICourseCreate {
  name: string;
  level: string;
  price: string;
  description: string;
  active: boolean;
  draft?: boolean;
}

export interface IModuleDelete {
  id: string;
}

export interface ILessonDelete {
  id: string;
}

export interface ICourseDelete {
  id?: string | null;
}
