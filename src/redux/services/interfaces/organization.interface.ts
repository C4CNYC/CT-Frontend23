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

export interface SettingsResponce extends BaseResponseInterface {
  language: string,
  marketplace_content_allowed: boolean,
  github_login_allowed: boolean,
  google_login_allowed: boolean,
  invite_only: boolean,
  chat_allowed: boolean,
  gallery_allowed: boolean,
  global_gallery_allowed: boolean
}

export interface IContacts {
  email: string;
  title: string;
  name: string;
  phone: string;
}


export interface ISettings {
  language: string,
  marketplace_content_allowed: boolean,
  github_login_allowed: boolean,
  google_login_allowed: boolean,
  invite_only: boolean,
  chat_allowed: boolean,
  gallery_allowed: boolean,
  global_gallery_allowed: boolean
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
