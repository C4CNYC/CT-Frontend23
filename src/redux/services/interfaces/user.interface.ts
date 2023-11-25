import {
  BaseListResponseInterface,
  BaseResponseInterface,
  BaseSearchInterface,
} from "@utils";
import { ISchool } from "src/redux/slices/global";

import { Role } from "../enums/role.enum";

export interface UserResponse extends IUser, BaseResponseInterface {}

export interface UserListResponse<Data>
  extends BaseListResponseInterface<Data> {}

export interface UserSearchParams extends BaseSearchInterface {
  schoolId?: string;
  name?: string;
  role?: string;
}

export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  verified?: boolean;
  active?: boolean;
  role: Role;
  avatar?: string;
  cover?: string;
  socials?: ISocials[];
  account?: null;
}

export interface StudentSearchParams extends BaseSearchInterface {
  schoolId?: string;
  name?: string;
  class_id?: string;
}

export interface IStudent {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  post_code: string;
  role: string;
  about: string;
  verified: boolean;
  active: boolean;
  password?: string;
  avatar: string;
  cover: string;
  account: IUser;
  username?: string | null;
  socials: ISocials[];
  school?: ISchool;
  createdAt?: string;
}

export interface IMentor {
  schoolId?: string;
  name: string;
  class_id?: string;
  email: string;
}

export interface MentorSearchParams extends BaseSearchInterface {
  schoolId?: string;
  name?: string;
  class_id?: string;
}
export interface IStudentSearchParams extends BaseSearchInterface {
  name?: string;
  role?: string;
}

export interface CreateUserRequest extends IUser {}

export interface UpdateUserRequest extends Omit<IUser, "email"> {
  user_id: string;
}
export interface IStudentProfile {
  post_code?: string;
  username?: string;
  about?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  cover?: string;
  country?: string;
  birthDate?: string;
  phone?: string;
}

export interface ISocials {
  name: string;
  type: string;
  link: string;
  id?: string;
}
