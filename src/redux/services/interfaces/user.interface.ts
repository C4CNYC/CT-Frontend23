import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";
import { Role } from "../enums/role.enum";

export interface User {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
}

export interface UserResponse extends User, BaseResponseInterface {}

export interface UserListResponse<Data>
  extends BaseListResponseInterface<Data> {}

export interface UserSearchParams {
  school_id?: string;
  name?: string;
  role?: string;
}

export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
}

export interface CreateUserRequest extends IUser {}

export interface UpdateUserRequest extends Omit<IUser, "email"> {
  user_id: string;
}
