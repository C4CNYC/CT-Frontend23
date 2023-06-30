import {
  BaseListResponseInterface,
  BaseResponseInterface,
  BaseSearchInterface,
} from "@ct-nx/utils";
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
}

export interface StudentSearchParams extends BaseSearchInterface {
  schoolId?: string;
  name?: string;
  class_id?: string;
}

export interface IStudent {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  post_code: string;
  about: string;
  verified: boolean;
  active: boolean;
  password?: string;
  avatar: string;
  cover: string;
  socials: ISocials[];
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

export interface CreateUserRequest extends IUser {}

export interface UpdateUserRequest extends Omit<IUser, "email"> {
  user_id: string;
}
export interface IStudentProfile {
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

export interface ISocials {
  name: string;
  type: string;
  link: string;
  id?: string;
}
