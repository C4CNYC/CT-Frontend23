import { IStudent } from "./user.interface";

export interface IStream {
  title: string;
  description: string;
  accessKey: string;
  students?: IStudent[];
}
