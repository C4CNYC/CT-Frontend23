import { BaseResponseInterface } from "@utils";
import { AssignmentComplexity } from "../enums/assignment-complexity.enum";
import { AssignmentStatuses } from "../enums/assignment-status.enum";
import { IClass } from "./class.interface";
import { ILesson } from "./content.interface";
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
