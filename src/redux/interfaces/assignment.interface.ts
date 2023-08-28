import { ICourse } from "@types";
import { BaseResponseInterface, BaseSearchInterface } from "@utils";
import { AssignmentTypes } from "src/redux/enums/assignment-types.enum";
import { IClass } from "src/redux/interfaces/class.interface";
import { ISkill } from "src/redux/interfaces/content.interface";

import { Status } from "../enums/assignments.enum";
import { ILesson } from "../services/interfaces/courseUnits.interface";
import { ITask } from "../services/interfaces/task.interface";

export interface IAssignment {
  id: string;
  course_progress: null | string;
  createdAt: string;
  createdat: string;
  updatedAt: string;
  name: string;
  course: ICourse;
  description: string;
  type: AssignmentTypes;
  status: string;
  active: boolean;
  start_date: Date;
  end_date: Date;
  close_date: Date;
  duration?: { hours: string; minutes: string };
  assignee_classes: Array<IClass & BaseResponseInterface>;
  lesson: ILesson & BaseResponseInterface;
  code_assignment: ITask & BaseResponseInterface;
  tags?: string[];
  students?: string[];
  meta: Record<string, any>;
  skill_tags?: ISkill[];
}

export interface IAssignmentUpdate {
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  description?: string;
  type?: string;
  status?: Status;
  active?: boolean;
  start_date?: string | Date;
  end_date?: string | Date;
  close_date?: string;
  duration?: string;
  meta?: Record<string, any>;
  tags?: string[] | [];
  skill_tags?: ISkill[];
}

export interface IAssignmentCreate {
  name: string;
  description?: string;
  type?: string;
  start_date?: string;
  end_date?: string;
  close_date?: string;
  classes?: string[];
  students?: string[];
  active?: boolean;
  meta?: Record<string, any>;
  tags?: string[] | [];
  skill_tags: string[];
}

export interface IAssignmetsSearchParams extends BaseSearchInterface {}
