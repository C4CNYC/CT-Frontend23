export interface IClass {
  total_students: number;
  name: string;
  active: boolean;
}

export interface ClassSearchParams {
  name: string;
}

export interface IModule {
  active?: boolean;
  key: any;
  name: string;
  type: string;
  description?: string;
}
