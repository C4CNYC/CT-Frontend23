import type { AuthUserType } from '@/auth/types'
import type { ILesson, ILessonContent } from '@/redux/interfaces/content.interface'
import { SupportedLang } from '@/sections/code-panel/lib/types'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'

export interface CodePanelBodyProps {
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
