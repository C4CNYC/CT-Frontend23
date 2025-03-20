import { Unit } from '@/redux/interfaces/challenges.interface'
import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'

export function getNextLessonId(
  courseContent: Unit[],
  currentLessonId: string,
  currentUnitId: string
): {
  path: string
  lessonId: string
  unitId: string
  type: LessonType
  isIndependent?: boolean
} | null {
  for (let i = 0; i < courseContent?.length; i++) {
    const unit = courseContent[i]

    if (unit?.id === currentUnitId) {
      for (let j = 0; j < unit.lessons?.length; j++) {
        const lesson = unit.lessons[j]

        if (lesson?.id === currentLessonId) {
          // Check if next lesson exist in current unit
          if (j + 1 < unit.lessons?.length) {
            const nextLesson = unit?.lessons[j + 1]
            return {
              path: `${unit?.id}/${nextLesson?.id}`,
              unitId: unit?.id,
              lessonId: nextLesson?.id,
              type: nextLesson?.type,
              isIndependent: nextLesson?.independent,
            }
          }
          // if next lesson don't exist in current unit, checking next unit
          if (i + 1 < courseContent?.length) {
            const nextUnit = courseContent[i + 1]
            const nextLesson = nextUnit?.lessons[0]
            return {
              path: `${nextUnit?.id}/${nextLesson?.id}`,
              unitId: nextUnit?.id,
              lessonId: nextLesson?.id,
              type: nextLesson?.type,
              isIndependent: nextLesson?.independent,
            }
          }
        }
      }
    }
  }
  // if next unit and next lesson not found
  return null
}
