import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'

export const handleConvertAutoRunToBolean = (value: string | undefined): boolean => {
  if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  } else {
    return Boolean(value)
  }
}

export const timeConvertorToSeconds = (time: Record<string, number> | null | undefined) => {
  if (time) {
    return Object.entries(time).reduce((acc, [timeType, time]) => {
      if (timeType === 'minutes') {
        return (acc += time)
      }
      return (acc += time * 60 + acc * 60)
    }, 0)
  }
  return 0
}

/*
| LessonType           | autoRun | independent |
|----------------------|---------|-------------|
| EXERCISE             | false   | true        |
| PRACTICAL            | false   | false       |
| START_PROJECT        | true    | true        |
| PART_PROJECT         | true    | false       |
| QUIZ                 | false   | true        |
| OPEN_PROJECT         | false   | true        |
| OTHER                | false   | true        |
*/
export const typeDefaultSettings = (type: LessonType) => {
  switch (type) {
    default:
    case LessonType.EXERCISE:
      return { autoRun: false, independent: true }
    case LessonType.PRACTICAL:
      return { autoRun: false, independent: false }
    case LessonType.START_PROJECT:
      return { autoRun: true, independent: true }
    case LessonType.PART_PROJECT:
      return { autoRun: true, independent: false }
    case LessonType.QUIZ:
      return { autoRun: false, independent: true }
    case LessonType.OPEN_PROJECT:
      return { autoRun: false, independent: true }
    case LessonType.OTHER:
      return { autoRun: false, independent: true }
  }
}
