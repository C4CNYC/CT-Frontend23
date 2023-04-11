import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { IModule } from "./class.interface";
import { ILesson, ILessonContent } from "./courseUnits.interface";
import { ILessonContentValidation } from "./lessonContentValidation.interface";
import { IStudent } from "./user.interface";

export interface IProgress {
  students: Array<IStudent & BaseResponseInterface>;
  completed_lessons: Array<ILesson & BaseResponseInterface>;
}

export interface IProgressSearch {
  class_id?: string;
}

export interface IProgressContent {
  units: Array<
    IModule & {
      lessons: ILesson & {
        contents: ILessonContent & {
          validations: ILessonContentValidation;
        };
      };
    }
  >;
}
