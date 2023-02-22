import { BaseResponseInterface } from "src/utils/baseResponce.interface";

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