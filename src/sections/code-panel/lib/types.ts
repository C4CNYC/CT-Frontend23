import type { User } from '@/redux/interfaces/auth.interface'
import { IFriend } from '@/redux/interfaces/friends.interface'

export type SupportedLang = 'html' | 'javascript'
export type UserWithStatusAndStudent = User & {
  status: string
  currentLessonId?: string
  student: IFriend
}
