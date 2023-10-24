import { BaseSearchInterface } from '@utils'

export interface IMedia {
  name: string;
  url: string;
  active?: boolean;
}
export interface IMediaCreate {
  name: string;
  url: string;
}

export interface IMediaUpdate {
  id: string;
  name: string;
  url: string;
  active?: boolean;
}

export interface IMediaDelete {
  id: string;
}

export interface IMediaSearchParams extends BaseSearchInterface {
  name?: string;
}
