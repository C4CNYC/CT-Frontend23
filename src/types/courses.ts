// ----------------------------------------------------------------------
export interface ICourse {
  id?: string | undefined;
  name: string;
  level: string;
  price: string;
  description: string;
  cover?: string;
  active: boolean;
  draft: boolean;
  total_lessons?: number;
}

export interface IUserProfileSchool {
  id: string;
  avatarUrl: string;
  name: string;
}
