import { BaseSearchInterface } from "src/utils/baseRequest.intergace";

export interface ITask {
  name: string;
  body: string;
  id: string;
}

export interface ITaskSearchParams extends BaseSearchInterface {
  name?: string;
}

export interface ITaskCreate {
  name: string;
  body: string;
}
export interface ITaskDelete {
  id: string;
}
