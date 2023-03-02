import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { AssignmentComplexity } from "../enums/assignment-complexity.enum";
import { AssignmentStatuses } from "../enums/assignment-status.enum";
import { IClass } from "./class.interface";
import { ILesson } from "./courseUnits.interface";
import { ITask } from "./task.interface";

export interface IAssignment {
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  type: string;
  status: AssignmentStatuses;
  active: boolean;
  start_date: string;
  end_date: string;
  complexity: AssignmentComplexity;
  duration?: { hours: string; minutes: string };
  assignee_classes: Array<IClass & BaseResponseInterface>;
  lesson: ILesson & BaseResponseInterface;
  code_assignment: ITask & BaseResponseInterface;
  meta: Record<string, number | string>;
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
  complexity?: AssignmentComplexity;
  duration?: string;
  meta?: Record<string, number | string>;
}

export interface IAssignmentCreate {
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  description?: string;
  type?: string;
  start_date?: string;
  end_date?: string;
  meta?: Record<string, unknown>;
}
