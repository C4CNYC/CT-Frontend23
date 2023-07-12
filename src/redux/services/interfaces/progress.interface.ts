import { BaseResponseInterface } from "@utils";

import { ILesson, ILessonContent, IModule } from "./courseUnits.interface";
import { ILessonContentValidation } from "./lessonContentValidation.interface";
import { IStudent } from "./user.interface";

export interface IProgress {
  unit: IModule & BaseResponseInterface;
  student: IStudent & BaseResponseInterface;
  completed_chalanges: Array<ILessonContent & BaseResponseInterface>;
}

export interface IProgressSearch {
  class_id?: string;
}

export interface IProgressContent {
  units: Array<
    IModule &
      BaseResponseInterface & {
        lessons: Array<
          ILesson &
            BaseResponseInterface & {
              contents: Array<
                ILessonContent &
                  BaseResponseInterface & {
                    validations: Array<
                      ILessonContentValidation & BaseResponseInterface
                    >;
                  }
              >;
            }
        >;
      }
  >;
}

export type IProgressChalanges = Array<{
  id: string;
  name: string;
  type: string;
  chalanges: Array<ILessonContent & BaseResponseInterface>;
  lessons: Array<{
    id: string;
    name: string;
    type: string;
    chalanges: Array<ILessonContent & BaseResponseInterface>;
  }>;
}>;
