import { BaseResponseInterface } from "@utils";

import { Role } from "../services/enums/role.enum";
import { IStudent } from "../services/interfaces/user.interface";
import { ISchool } from "../slices/global";
import { IClass } from "./class.interface";
import { ISocials } from "./socials.interface";

export interface User extends BaseResponseInterface {
  avatar: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  classes?: Array<IClass & BaseResponseInterface>;
  school?: ISchool;
  cover?: string;
  role: Role;
  city?: string | null;
  username?: string | null;
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
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  name?: string;
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
  role: Role;
  student_profile: IStudent & BaseResponseInterface;
  city?: string | null;
}
