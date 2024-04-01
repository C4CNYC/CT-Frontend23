import { useState } from 'react'

import { Button, Stack, useMediaQuery, useTheme } from '@mui/material'
import { HiMenuAlt2 } from '@react-icons/all-files/hi/HiMenuAlt2'

import { ILesson } from '@/redux/interfaces/content.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import { SWITCH_BTN_SX, getLessonListSx } from './constants'
import RoadIcon from './icons/RoadIcon'
import LessonItem from './lesson-item'
import StoryRoad from './story-road'

interface ILessonListProps {
  lessons: Array<ILesson & BaseResponseInterface>
  unitId: string
}

export default function LessonsList({ lessons, unitId }: ILessonListProps): React.ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(600))
  const [isList, setIsList] = useState(true)

  const isLockedLessonCheck = (index: number) => {
    if (index === 0) return false
    const prewLesson = lessons[index - 1]
    if (prewLesson.progress) {
      if (prewLesson.progress >= 90) return false
    }
    return true
  }

  return (
    <Stack sx={getLessonListSx(isMobile, theme)}>
      <Stack
        direction='row'
        alignSelf='flex-end'
        mr={isMobile ? 0 : -4}
        gap={0.5}
      >
        <Button
          onClick={() => {
            setIsList(true)
          }}
          sx={{
            ...SWITCH_BTN_SX,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            background: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper,
          }}
        >
          <HiMenuAlt2
            size={25}
            color={isList ? '#EE467A' : '#C4C4C4'}
          />
        </Button>
        <Button
          onClick={() => {
            setIsList(false)
          }}
          sx={{
            ...SWITCH_BTN_SX,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            background: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper,
          }}
        >
          <RoadIcon
            width={23}
            height={23}
            color={!isList ? '#EE467A' : '#C4C4C4'}
          />
        </Button>
      </Stack>
      {isList ? (
        lessons.map((l, i) => (
          <LessonItem
            lesson={l}
            unitId={unitId}
            key={l.id}
            locked={isLockedLessonCheck(i)}
          />
        ))
      ) : (
        <StoryRoad
          lessons={lessons}
          isLockedLessonCheck={isLockedLessonCheck}
        />
      )}
    </Stack>
  )
}
