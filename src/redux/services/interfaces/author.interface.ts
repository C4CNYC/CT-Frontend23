export interface IAuthor {
  name: string;
  about: string;
  linkedin: string;
  email: string;
  avatar: string | null;
  id?: string;
}
export interface IAuthorSearchParams {
  course_id?: string;
  email?: string;
}
