import { ILessonContent } from '@/redux/services/interfaces/courseUnits.interface'
import { IIntegration } from '@/redux/services/interfaces/integration.interface'
import { LessonContentType } from '@root/src/redux/enums/lesson-content-type.enum'
import { BaseResponseInterface } from '@root/src/utils'

import StepCode from './StepCode'
// import StepMultimedia from './StepMultimedia'
import { StepTinyMce } from './StepTinyMce'

export type EditorSelectorProps = {
  bodyType?: LessonContentType
  content: string
  onSubmit: (value: string) => void
  data: ILessonContent & BaseResponseInterface
  lessonId: string
  integrations: IIntegration[]
  bgColor: string
  setBgColor?: (bgColor: string) => void
}

export function EditorSelector({
  bodyType,
  onSubmit,
  content,
  data,
  lessonId,
  integrations,
  bgColor,
  setBgColor,
}: EditorSelectorProps): React.ReactElement {
  switch (bodyType) {
    default:
    case LessonContentType.Code:
      return (
        <StepCode
          content={content}
          integrations={integrations ?? []}
          onSubmit={onSubmit}
          data={data!}
          lessonId={lessonId as string}
        />
      )
    case LessonContentType.Editable:
    // return (
    //   <StepMultimedia
    //     content={content}
    //     integrations={integrations ?? []}
    //     onSubmit={onSubmit}
    //     data={data!}
    //     lessonId={lessonId as string}
    //     bgColor={bgColor}
    //     setBgColor={setBgColor}
    //   />
    // )
    case LessonContentType.TinyMce:
      return (
        <StepTinyMce
          content={content}
          integrations={integrations ?? []}
          onSubmit={onSubmit}
          data={data!}
          lessonId={lessonId as string}
          bgColor={bgColor}
          setBgColor={setBgColor}
        />
      )
  }
}
