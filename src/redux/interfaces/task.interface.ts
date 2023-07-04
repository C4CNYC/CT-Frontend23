import { BaseSearchInterface } from "@utils";

export interface ITask {
  language: string;
  name: string;
  body: string;
  id: string;
}

export interface ITaskSearchParams extends BaseSearchInterface {
  name?: string;
}
