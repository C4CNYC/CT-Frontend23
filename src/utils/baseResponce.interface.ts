export interface BaseResponseInterface {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseListResponseInterface<Data> {
  data: Data[];
  meta: {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
  };
}
