import { BaseSearchInterface } from '@/utils'

import { ISocials } from './socials.interface'

export interface IFriend {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string
  country: string
  state: string
  city: string
  post_code: string
  about: string
  verified: boolean
  active: boolean
  avatar: string
  cover: string
  username: string | null
  socials: ISocials[]
  status: string
  currentLessonId?: string
  createdAt: string
  updatedAt: string
}
export interface IFriendsSearchParams extends BaseSearchInterface {
  name?: string
  class_id?: string
}
