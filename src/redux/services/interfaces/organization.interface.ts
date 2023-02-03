import { BaseResponseInterface } from "src/utils/baseResponce.interface";

export interface OrganizationResponce extends BaseResponseInterface {
  title: string;
  name: string;
  email: string;
  url: string;
  address: string;
}

export interface ContactsResponce extends BaseResponseInterface {
  email: string;
  title: string;
  name: string;
  phone: string;
}

export interface IContacts {
  email: string;
  title: string;
  name: string;
  phone: string;
}

export interface OrganizationListResponce {
  data: OrganizationResponce[];
  meta: {};
}

export interface OrganizationRequest {
  title: string;
  email: string | null;
  url: string;
  address: string;
}
