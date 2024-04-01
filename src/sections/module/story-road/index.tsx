import { useMediaQuery, useTheme } from '@mui/material'

import { ILesson } from '@/redux/interfaces/content.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import RoadItem from './RoadItem'
import RoadItemMobile from './RoadItemMobile'

interface StoryRoadProps {
  lessons: Array<ILesson & BaseResponseInterface>
  isLockedLessonCheck: (index: number) => boolean
}

const StoryRoad = ({ lessons, isLockedLessonCheck }: StoryRoadProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(660))

  const isLessonStarted = (progress: number | null) => {
    if (!progress) return false
    return progress > 0
  }

  const isLastActive = (index: number) => {
    if (lessons.length === 1) {
      return true
    } else if (index === lessons.length - 1 && isLessonStarted(lessons[index].progress)) {
      return true
    } else if (
      isLessonStarted(lessons[index - 1]?.progress) &&
      !isLessonStarted(lessons[index + 1].progress)
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {isMobile
        ? lessons.map((l, i) => (
            <RoadItemMobile
              key={l.id}
              locked={isLockedLessonCheck(i)}
              compleated={l.progress ? l.progress > 90 : false}
              progress={l.progress ?? 0}
              lastActive={isLastActive(i)}
              firstItem={i === 0}
              lastItem={i === lessons.length - 1}
              name={l.name}
              description={l.description}
              lessonId={l.id}
              type={l.type}
            />
          ))
        : lessons.map((l, i) => (
            <RoadItem
              key={l.id}
              locked={isLockedLessonCheck(i)}
              compleated={l.progress ? l.progress > 90 : false}
              progress={l.progress ?? 0}
              oddItem={!!(i % 2)}
              firstItem={i === 0}
              lastActive={isLastActive(i)}
              lastItem={i === lessons.length - 1}
              name={l.name}
              description={l.description}
              lessonId={l.id}
              type={l.type}
            />
          ))}
    </>
  )
}

export default StoryRoad
