import { BaseSearchInterface } from "@utils";

export interface IClass {
  school_id: string;
  school_name: string;
  school_country: string;
  school_address: string;
  school_phone: string;
  school_city: string;
  school_zip: string | null;
  school_type: string | null;
  school_about: string;
  school_active: boolean;
  school_avatar: string | null;
  school_cover: string | null;
  setting_share_token_enable: boolean;
  setting_request_join_enable: boolean;
  setting_subscribe_enable: boolean;
  setting_share_token: string;
  students: string;
  class_id: string;
  pendings: string;
  id: string;
  createdAt: string;
  name: string;
  description: string;
  avatar: string | null;
  cover: string | null;
  active: boolean;
  country: string;
  address: string;
  phone: string;
  city: string;
  about: string;
  zip: string | null;
  type: string | null;
}

export interface IClassSetting {
  setting_share_token_enable: boolean;
  setting_request_join_enable: boolean;
  setting_subscribe_enable: boolean;
  share_token: string;
}

export interface IMentor {
  id: string;
  email: string;
  role: string;
  first_name: string;
  avatar: string | null;
  last_name: string;
  verified: boolean;
  active: boolean;
}

export interface ClassSearchParams extends BaseSearchInterface {
  name?: string;
}
