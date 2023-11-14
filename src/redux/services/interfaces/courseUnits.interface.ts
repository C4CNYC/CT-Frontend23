import { BaseResponseInterface, BaseSearchInterface } from "@utils";

import { LessonContentComplexity } from "../enums/lesson-content-complexity.enum";
import { LessonContentType } from "../enums/lesson-content-type.enum";
import { ILessonContentValidation } from "./lessonContentValidation.interface";

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
  tips: string[] | [];
  meta: Record<string, Record<string, any>>;
}

export interface ICourse {
  name: string;
  level: string;
  price: string;
  description: string;
  active: boolean;
  cover: string;
  public: boolean;
  draft: boolean;
  skills: [];
}

export interface ILessonContent {
  body: string;
  name: string;
  type: LessonContentType;
  slug: string;
  title: string;
  description: string;
  active: boolean;
  draft: boolean;
  tags: string[];
  preload_body: string;
  solution_body: string;
  meta: Record<string, any>;
  complexity: LessonContentComplexity;
  validations: Array<ILessonContentValidation & BaseResponseInterface>;
}

export interface ILessonContentUpdate {
  body?: string;
  type?: LessonContentType;
  slug?: string;
  title?: string;
  description?: string;
  active?: boolean;
  draft?: boolean;
  tags?: string[];
  meta?: Record<string, any>;
  complexity?: LessonContentComplexity;
}

export interface ILessonUpdate {
  id: string;
  name: string;
  description: string;
  active?: boolean;
  tips?: string[] | [];
}

export interface IAddLessonToModule {
  id: string;
  lesson_id: string;
}

export interface IRemoveLessonFromModule {
  id: string;
  lesson_id: string;
}

export interface IAddModuleToCourse {
  id: string;
  unit_id: string;
}

export interface IRemoveModuleFromCourse {
  id: string;
  unit_id: string;
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
  assignment_id?: string;
}

export interface ICourseSearchParams extends BaseSearchInterface {
  class_id?: string;
  school_id?: string;
  name?: string;
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
