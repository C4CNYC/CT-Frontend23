import { BaseResponseInterface, BaseSearchInterface } from "@utils";
import { Unit } from "src/redux/interfaces/challenges.interface";

import { LessonContentType } from "../enums/lesson-content-type.enum";
import { IIntegration } from "./integration.interface";

export interface ICourseElement {
  id: string;
  course_id?: string;
  name: string;
  level: string;
  price: string;
  description: string;
  active: boolean;
  cover: string;
  draft: boolean;
  progress: number | null;
  likes_count?: number;
  total_lessons: number;
  liked: boolean;
  my_rating: number | null;
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

export interface IModuleContent {
  active: boolean;
  avatar: string | null;
  description: string;
  id: string;
  name: string;
  progress: string | null;
  duration: string | null;
}

export interface ILesson {
  active: boolean;
  draft: boolean;
  name: string;
  description: string;
  integrations: Array<IIntegration & BaseResponseInterface>;
  id: string;
  tips: string[] | [];
  progress?: number;
  skills: ISkill[];
}

export interface ILessonCurrent {
  active: boolean;
  name: string;
  description: string;
  draft?: boolean;
  id: string;
  lessons?: [];
  progress?: number | null;
}

export interface ILessonContent {
  body: string;
  preload_body: string;
  solution_body: string;
  validations: Array<IValidation & BaseResponseInterface>;
  type: LessonContentType;
  meta: Record<string, any>;
  integrations: IIntegration[];
  progress?: number | null;
}

export interface ISkill {
  name: string;
  description: string;
  id: string;
}

export interface IValidation {
  name: string;
  regex: string;
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

export interface LastVisitedData {
  lastVisitedUnitId: string;
  lastVisitedLessonId: string;
}

export interface LastVisitedBody {
  unitId: string;
  lessonId: string;
}

export interface LastVisitedState {
  unitId: string | null;
  lessonId: string | null;
}
