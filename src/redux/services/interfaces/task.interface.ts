import { BaseSearchInterface } from "@utils";

export interface ITask {
  name: string;
  body: string;
  id: string;
  language: string;
}

export interface ITaskSearchParams extends BaseSearchInterface {
  name?: string;
}

export interface ITaskCreate {
  language: string;
  name: string;
  body: string;
}
export interface ITaskDelete {
  id: string;
}
