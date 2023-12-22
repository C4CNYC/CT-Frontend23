import { BaseResponseInterface, BaseSearchInterface } from "@utils";

import { LessonContentComplexity } from "../enums/lesson-content-complexity.enum";
import { LessonContentType } from "../enums/lesson-content-type.enum";
import { ILessonContentValidation } from "./lessonContentValidation.interface";

export interface IModule {
  id: string;
  active: boolean;
  name: string;
  description: string;
  data: [];
  avatar: string | null;
  tips: string[] | [];
  duration: string | null;
}

export interface ILesson {
  data: [];
  active: boolean;
  name: string;
  description: string;
  tips: string[] | [];
  meta: Record<string, Record<string, any>>;
  independent: boolean;
  type: "practical" | "exercise" | "quiz";
}

export interface ICourse {
  name: string;
  content_id: string;
  level: string;
  price: string;
  description: string;
  initial_enrolled: number;
  initial_likes: number;
  initial_stars: number;
  active: boolean;
  cover: string;
  public: boolean;
  draft: boolean;
  skills: [];
  units: IModule[];
}

export interface ILessonContent {
  id: string;
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
  tips: string;
  solution_body: string;
  meta: Record<string, any>;
  complexity: LessonContentComplexity;
  validations: Array<ILessonContentValidation & BaseResponseInterface>;
}

export interface ILessonContentUpdate {
  body?: string;
  type?: LessonContentType;
  slug?: string;
  tips?: string;
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
  tips: string[] | [];
  initia_likes?: number;
  initial_start?: number;
  initial_enrolled?: number;
  duration?: string;
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
