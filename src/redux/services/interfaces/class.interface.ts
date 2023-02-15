export interface IClass {
  total_students: number;
  name: string;
  active: boolean;
}

export interface ClassSearchParams {
  name: string;
  class_id: string;
}
