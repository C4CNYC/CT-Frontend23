import type { AuthUserType } from '@/auth/types'
import type { BaseResponseInterface } from '@/lib/utils'
import type { ILesson, ILessonContent } from '@/redux/interfaces/content.interface'

export type SupportedLang = 'html' | 'javascript'

export interface WorkSpaceProps {
  isFetching?: boolean
  lesson?: ILesson & BaseResponseInterface
  data: Array<ILessonContent & BaseResponseInterface>
  user: AuthUserType
  code: string
  language: SupportedLang
  onChangeCode: (code: string) => void
  onSubmitChallenge: (lessonContentId: string) => Promise<void>
  onSubmitLesson: () => Promise<void>
  lastLessonCode?: string
}
