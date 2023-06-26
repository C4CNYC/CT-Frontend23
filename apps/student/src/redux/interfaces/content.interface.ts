import { BaseResponseInterface, BaseSearchInterface } from "@ct-nx/utils";
import { Unit } from "src/redux/interfaces/challenges.interface";
import { LessonContentType } from "../enums/lesson-content-type.enum";
import { IIntegration } from "./integration.interface";

export interface IModule {
  active: boolean;
  name: string;
  description: string;
  data: [];
}

export interface ILesson {
  active: boolean;
  draft: boolean;
  name: string;
  description: string;
  integrations: Array<IIntegration & BaseResponseInterface>;
  id: string;
  progress?: number;
  skills: ISkill[];
}

export interface ISkill {
  name: string;
  description: string;
  id: string;
}
export interface ILessonCurrent {
  active: boolean;
  name: string;
  description: string;
  draft?: boolean;
  id: string;
  lessons?: [];
}

export interface ICourse {
  name: string;
  level: string;
  price: string;
  description: string;
  active: boolean;
  cover: string;
  draft: boolean;
  total_lessons: number;
  course_id: string;
}
// ==== updated interfaces ===
export interface ICourseElement {
  id?: string;
  course_id?: string;
  units?: [];
  name: string;
  level: string;
  price: string;
  description: string;
  active: boolean;
  cover: string;
  draft: boolean;
  progress?: number;
  likes_count?: number;
  total_lessons: number;
}
export interface ICourseContent {
  id: string;
  units: Unit[];
  name: string;
  level: string;
  price: string;
  description: string;
  active: boolean;
  cover: string;
  draft: boolean;
  total_lessons: number;
}
export interface IUnitContent {
  id: string;
  lessons: ILesson[];
  name: string;
  description?: string;
  active: boolean;
}

export interface IValidation {
  name: string;
  regex: string;
}

export interface ILessonContent {
  body: string;
  preload_body: string;
  solution_body: string;
  validations: Array<IValidation & BaseResponseInterface>;
  type: LessonContentType;
  meta: Record<string, any>;
  integrations: IIntegration[];
}

// ================
export interface IModulesSearchParams extends BaseSearchInterface {
  name?: string;
  course_id?: string;
}

export interface ILessonSearchParams extends BaseSearchInterface {
  name?: string;
  module_id?: string;
  assignment_id?: string;
}

export interface ICourseSearchParams extends BaseSearchInterface {
  class_id?: string;
  school_id?: string;
  name?: string;
}
