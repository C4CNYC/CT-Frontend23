import { BaseResponseInterface } from "src/utils/baseResponce.interface";

export interface OrganizationResponce extends BaseResponseInterface {
  name: string;
  email: string;
  url: string;
  address: string;
}

export interface OrganizationListResponce {
  data: OrganizationResponce[];
  meta: {};
}

export interface OrganizationRequest {
  name: string;
  email: string | null;
  url: string;
  address: string;
}
