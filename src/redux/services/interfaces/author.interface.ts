export interface IAuthor {
  name: string;
  about: string;
  linkedin: string;
  email: string;
  avatar: string | null;
  id?: string;
}
export interface IAuthorSearchParams {
  name?: string;
  email?: string;
}
