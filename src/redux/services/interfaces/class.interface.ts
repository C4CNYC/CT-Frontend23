export interface IClass {
  total_students?: number;
  total_courses?: number;
  name: string;
  cover: string;
  active: boolean;
  avatar: string;
  description?: string;
}

export interface ClassSearchParams {
  name?: string;
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

export interface IClassSettings {
  schoolId: string;
  classId: string;
  request_join_enable?: boolean;
  share_token_enable?: boolean;
  subscribe_enable?: boolean;
}
