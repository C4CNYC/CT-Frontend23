import { BaseResponseInterface } from "src/utils/baseResponce.interface";


export interface IClass {
  total_students: number;
  name: string;
  active: boolean;
}

export interface ClassSearchParams {
  name: string;
}

export interface IModule {
  active: boolean;
  name: string;
  description: string;
}

export interface ILesson {
  active: boolean;
  name: string;
  description: string;
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

export interface IModuleDelete {
  id: string;
}

export interface ILessonDelete {
  id: string;
}