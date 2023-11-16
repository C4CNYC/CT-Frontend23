import { BaseSearchInterface } from '@utils'

export interface IMedia {
  name: string;
  url: string;
  active?: boolean;
  size: number;
  acl: string;
  type: string;
  userId?: string;
}
export interface IMediaCreate {
  name: string;
  url: string;
  size: number;
  acl: string;
  type: string;
  userId?: string;
}

export interface IMediaUpdate {
  id: string;
  name: string;
  url: string;
  active?: boolean;
  size: number;
  acl: string;
  type: string;
}

export interface IMediaPathUpdate {
  path: string;
  newPath: string;
}

export interface IMediaDelete {
  id: string;
}

export interface IMediaSearchParams extends BaseSearchInterface {
  name?: string;
}
