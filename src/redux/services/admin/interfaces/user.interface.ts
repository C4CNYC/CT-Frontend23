import {
  BaseListResponseInterface,
  BaseResponseInterface,
} from "src/utils/baseResponce.interface";

export interface User {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
}

export interface UserResponse extends User, BaseResponseInterface {}

export interface UserListResponse<Data>
  extends BaseListResponseInterface<Data> {}
