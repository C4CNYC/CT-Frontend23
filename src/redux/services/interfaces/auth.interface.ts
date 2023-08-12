import { BaseResponseInterface } from "@utils";
import { IClass } from "src/redux/interfaces/class.interface";

import { ISchool } from "../../slices/global";
import { ISocials } from "./socials.interface";

export interface User extends BaseResponseInterface {
  avatar: string;
  email: string;
  name: string;
  role: string;
  first_name: string;
  last_name: string;
  classes?: Array<IClass & BaseResponseInterface>;
  school?: ISchool;
  cover?: string;
}

export interface UserResponse {
  student: User;
  access_token: string;
}

export interface ManagerResponse {
  user: User & BaseResponseInterface;
  access_token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TenantResponce extends BaseResponseInterface {
  name: string;
}

export interface TenantRequest {
  name: string;
}

export interface RegisterResponce extends BaseResponseInterface {
  access_token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}
export interface IUser {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  name?: string;
  role?: string;
  school?: ISchool;
  classes?: IClass[];
  country?: string;
  createdAt?: string;
  phone?: string;
  about?: string;
  socials?: ISocials[];
  username?: string;
  post_code?: string;
  cover?: string;
}
