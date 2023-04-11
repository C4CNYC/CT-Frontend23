export interface IClass {
  total_students?: number;
  total_courses?: number;
  name: string;
  active: boolean;
}

export interface ClassSearchParams {
  name?: string;
}

export interface IModule {
  active?: boolean;
  key: any;
  name: string;
  type: string;
  description?: string;
}

export interface IAddCourseToClass {
  id: string;
  schoolId: string;
  course_id: string;
}

export interface IRemoveCourseFromClass {
  id: string;
  schoolId: string;
  course_id: string;
}
