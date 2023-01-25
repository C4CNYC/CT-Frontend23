export interface BaseResponseInterface {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseListResponseInterface<Data> {
  data: Data;
}
