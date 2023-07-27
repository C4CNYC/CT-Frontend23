import { ICourse } from "@types";
import { BaseResponseInterface } from "@utils";
import { ISkill } from "src/redux/interfaces/content.interface";
import { AssignmentTypes } from "src/redux/services/enums/assignment-types.enum";

import { AssignmentComplexity } from "../enums/assignment-complexity.enum";
import { AssignmentStatuses } from "../enums/assignment-status.enum";
import { IClass } from "./class.interface";
import { ILesson } from "./courseUnits.interface";
import { ITask } from "./task.interface";

export interface IAssignment {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  course: ICourse;
  description: string;
  type: AssignmentTypes;
  status: string;
  active: boolean;
  start_date: string;
  end_date: string;
  close_date: string;
  complexity: AssignmentComplexity;
  duration?: { hours: string; minutes: string };
  assignee_classes: Array<IClass & BaseResponseInterface>;
  lesson: ILesson & BaseResponseInterface;
  code_assignment: ITask & BaseResponseInterface;
  skills?: ISkill[];
  students?: string[];
  meta: Record<string, any>;
}

export interface IAssignmentUpdate {
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  description?: string;
  type?: string;
  status?: AssignmentStatuses;
  active?: boolean;
  start_date?: string;
  end_date?: string;
  close_date?: string;
  complexity?: AssignmentComplexity;
  duration?: string;
  meta?: Record<string, any>;
  skills?: ISkill[] | [];
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
  skills?: ISkill[] | [];
}
