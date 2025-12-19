import { IModule } from '../redux/interfaces/content.interface'

export interface ICourse {
  id?: string | undefined
  name: string
  level: string
  customLevel?: string
  age: string
  customAge?: string
  price: string
  description: string
  cover?: string
  active: boolean
  draft: boolean
  total_lessons?: number
  units?: IModule[]
  is_show_in_catalog?: boolean
}

export interface IUserProfileSchool {
  id: string
  avatarUrl: string
  name: string
}
