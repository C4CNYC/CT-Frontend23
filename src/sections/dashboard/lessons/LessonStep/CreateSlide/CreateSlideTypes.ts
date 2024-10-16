import { ILessonContent } from '@/redux/services/interfaces/courseUnits.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

export type SlideType = ILessonContent & BaseResponseInterface
export type DialogTypes = 'Empty Slide' | 'HTML Template' | 'Normal Template' | 'With AI' | ''

export type CloneSlideDialogsProps = {
  dialogType: DialogTypes
  changeDialogType: (dialogType: DialogTypes) => void
  createEmptySlide: () => void
  lessonId: string
}

export type SlideSelectListProps = {
  lessonContentTemplates: SlideType[]
  selectedSlide: SlideType | null
  setSelectedSlide: (slide: SlideType) => void
}
