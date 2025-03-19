import { useProperties } from '@root/src/hooks/useProperties'
import {
  LessonType,
  LessonTypePseudo,
  LessonTypePseudoEnum,
} from '@root/src/redux/services/enums/lesson-type.enum'

import { CreateLessonIDefaultProps } from './CreateLessonDialog'

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

  function toDbFields(pseudoType: LessonTypePseudoEnum) {
    switch (pseudoType) {
      default:
      case LessonTypePseudo.simple:
        return { type: LessonType.EXERCISE, autoRun: false, independent: true }
      case LessonTypePseudo.practical:
        return { type: LessonType.PRACTICAL, autoRun: false, independent: false }
      case LessonTypePseudo.start_project:
        return { type: LessonType.PRACTICAL, autoRun: true, independent: true }
      case LessonTypePseudo.part_project:
        return { type: LessonType.PRACTICAL, autoRun: true, independent: false }
      case LessonTypePseudo.exercise:
        return { type: LessonType.EXERCISE, autoRun: true, independent: true }
      case LessonTypePseudo.concept_exercises:
        return { type: LessonType.EXERCISE, autoRun: true, independent: false }
    }
  }

  function toPseudoType(t?: LessonType) {
    switch (t) {
      default:
      case LessonType.EXERCISE:
        if (autoRun) {
          if (defaultValues?.independent) {
            return LessonTypePseudo.exercise
          }
          return LessonTypePseudo.concept_exercises
        } else {
          if (defaultValues?.independent) {
            return LessonTypePseudo.simple
          }
          //undefined
          return LessonTypePseudo.simple
        }
      case LessonType.PRACTICAL:
        if (autoRun) {
          if (defaultValues?.independent) {
            return LessonTypePseudo.start_project
          }
          return LessonTypePseudo.part_project
        } else {
          if (defaultValues?.independent) {
            return LessonTypePseudo.practical
          }
          return LessonTypePseudo.practical
        }
    }
  }

  return {
    toPseudoType,
    toDbFields,
  }
}
