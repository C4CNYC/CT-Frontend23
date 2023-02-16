import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { AssigmentStatuses } from "../enums/assigment-status.enum";
import { IClass } from "./class.interface";

export interface IAssigment {
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  type: string;
  status: AssigmentStatuses;
  active: boolean;
  start_date: string;
  end_date: string;
  assignee_classes: (IClass & BaseResponseInterface)[];
  meta: {
    [key: string]: number | string;
  };
}

export interface IAssigmentUpdate {
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  description?: string;
  type?: string;
  status?: AssigmentStatuses;
  active?: boolean;
  start_date?: string;
  end_date?: string;
  meta?: {
    [key: string]: number | string;
  };
}
