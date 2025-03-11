import { useProperties } from '@root/src/hooks/useProperties'
import { LessonType } from '@root/src/redux/interfaces/content.interface'

import { CreateLessonIDefaultProps, LessonTypeEnum } from './CreateLessonDialog'

type PseudoTypeProps = {
  lessonId?: string
  defaultValues?: CreateLessonIDefaultProps
}

/*
                LessonType      Autorun     Independent     
simple          Exercise        x           v                 1
simple?         Exercise        x           x                 1
practical?      Practical       x           v                 1
practical       Practical       x           x                 1
start_project   Practical       v           v                 1
part_project    Practical       v           x                 1
exercise        Exercise        v           v                 1
concept_exercis Exercise        v           x                 1 
*/

export const usePseudoType = ({ lessonId, defaultValues }: PseudoTypeProps) => {
  const [autoRun, autoRunSet, autoRunDelete] = useProperties({
    entityType: 'lesson',
    entityId: lessonId || '',
    propertyName: 'autoRun',
  })

  function toDbFields(pseudoType: LessonTypeEnum) {
    switch (pseudoType) {
      default:
      case LessonTypeEnum.simple:
        return { type: LessonType.EXERCISE, autoRun: false, independent: true }
      case LessonTypeEnum.practical:
        return { type: LessonType.PRACTICAL, autoRun: false, independent: false }
      case LessonTypeEnum.start_project:
        return { type: LessonType.PRACTICAL, autoRun: true, independent: true }
      case LessonTypeEnum.part_project:
        return { type: LessonType.PRACTICAL, autoRun: true, independent: false }
      case LessonTypeEnum.exercise:
        return { type: LessonType.EXERCISE, autoRun: true, independent: true }
      case LessonTypeEnum.concept_exercises:
        return { type: LessonType.EXERCISE, autoRun: true, independent: false }
    }
  }

  function toPseudoType(t?: LessonType) {
    switch (t) {
      default:
      case LessonType.EXERCISE:
        if (autoRun) {
          if (defaultValues?.independent) {
            return LessonTypeEnum.exercise
          }
          return LessonTypeEnum.concept_exercises
        } else {
          if (defaultValues?.independent) {
            return LessonTypeEnum.simple
          }
          //undefined
          return LessonTypeEnum.simple
        }
      case LessonType.PRACTICAL:
        if (autoRun) {
          if (defaultValues?.independent) {
            return LessonTypeEnum.start_project
          }
          return LessonTypeEnum.part_project
        } else {
          if (defaultValues?.independent) {
            return LessonTypeEnum.practical
          }
          return LessonTypeEnum.practical
        }
    }
  }

  return {
    toPseudoType,
    toDbFields,
  }
}
