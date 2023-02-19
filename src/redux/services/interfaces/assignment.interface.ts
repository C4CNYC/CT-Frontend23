import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { AssignmentComplexity } from "../enums/assignment-complexity.enum";
import { AssignmentStatuses } from "../enums/assignment-status.enum";
import { IClass } from "./class.interface";

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
  assignee_classes: (IClass & BaseResponseInterface)[];
  meta: {
    [key: string]: number | string;
  };
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
  meta?: {
    [key: string]: number | string;
  };
}

export interface IAssignmentDelete {}

export interface IAssignmentCreate {
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  description?: string;
  type?: string;
  start_date?: string;
  end_date?: string;
  meta?: {};
}
