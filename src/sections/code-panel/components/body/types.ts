import type { ILesson, ILessonContent } from '@/redux/interfaces/content.interface'
import { SupportedLang } from '@/sections/code-panel/lib/types'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'

export interface CodePanelBodyProps {
  lesson?: ILesson & BaseResponseInterface
  lessonContents: Array<ILessonContent & BaseResponseInterface>
  language: SupportedLang
  onSubmitChallenge: (lessonContentId: string) => Promise<void>
  onSubmitLesson: () => Promise<void>
  lastLessonCode?: string
  isLoadingLessonContent: boolean
}
