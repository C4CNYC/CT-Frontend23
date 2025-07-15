export interface IAuthor {
  name: string
  about: string
  linkedin: string
  email: string
  avatar: string | null
  id?: string
}
export interface ICourseAuthorSearchParams {
  course_id?: string
  email?: string
}

export interface IModuleAuthorSearchParams {
  course_unit_id?: string
  email?: string
}
