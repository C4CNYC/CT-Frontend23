import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { ILesson } from "./courseUnits.interface";
import { IStudent } from "./user.interface";

export interface IProgress {
  students: Array<IStudent & BaseResponseInterface>;
  completed_lessons: Array<ILesson & BaseResponseInterface>;
}

export interface IProgressSearch {
  class_id?: string;
}
