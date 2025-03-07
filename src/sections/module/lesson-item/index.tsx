import { useRef, useState } from 'react'

import { Box, Button, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { AiOutlineClockCircle } from '@react-icons/all-files/ai/AiOutlineClockCircle'
import { GoTriangleDown } from '@react-icons/all-files/go/GoTriangleDown'
import { GoTriangleUp } from '@react-icons/all-files/go/GoTriangleUp'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { useAuthContext } from '@/auth/useAuthContext'
import { ILesson } from '@/redux/interfaces/content.interface'
import { setPrevLessonId } from '@/redux/slices/code-panel-global'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useTranslate } from '@/utils/translateHelper'
import useControlEllipsis from '@root/src/hooks/useControlEllipsis'
import { convertDurationToMins } from '@root/src/utils/convertDurationToMins'
import { convertMinsToString } from '@root/src/utils/convertMinsToString'

import RocketIcon from '../icons/RocketIcon'

import { DURATION_SX, MODE_TITLE_SX, SEE_MORE_SX, getLessonSx } from './constants'
import { LessonItemButton } from './LessonItemButton'
import TrainingProgress from './LessonProgress'

interface ILessonItemProps {
  lesson: ILesson
  unitId?: string
  locked: boolean
  prevLesson?: ILesson
  index?: number
}

export default function LessonItem({
  lesson,
  unitId,
  locked,
  prevLesson,
  index,
}: ILessonItemProps): React.ReactElement {
  const { textRef, longDesc } = useControlEllipsis()
  const { user } = useAuthContext()
  const { push } = useRouter()
  const translate = useTranslate()
  const dispatch = useDispatch()
  const theme = useTheme()

  const [openDetails, setOpenDetails] = useState(false)
  const btnRef = useRef<HTMLDivElement | null>(null)

  const courseId = useRouter().query.id
  const lastLessonProgress = prevLesson?.progress ?? 100
  const isLastLessonInProgress = lastLessonProgress <= 90

  const fetchCodeFromPrevLesson = () => {
    dispatch(setPrevLessonId(`${user?.student_profile?.id}_${prevLesson?.id}`))
    push(
      STUDENT_PATH_DASHBOARD.codePanel.workSpace({
        courseId: courseId as string,
        unitId,
        lessonId: lesson.id,
      })
    )
  }

  const fetchDefaultCodeFromPrevLesson = () => {
    push(
      STUDENT_PATH_DASHBOARD.codePanel.workSpace({
        courseId: courseId as string,
        unitId,
        lessonId: lesson.id,
      })
    )
  }

  const btnTrigger = (e: React.MouseEvent<HTMLElement>) => {
    const container = document.getElementById(lesson.id)

    if (!btnRef.current || !container) return

    const button = btnRef.current.querySelector('button, a, div')

    if (!button?.contains(e.target as HTMLElement) && !container.contains(e.target as HTMLElement))
      return

    if (button instanceof HTMLElement) {
      button.click()
    }
  }

  return (
    <Stack
      sx={getLessonSx(theme)}
      onClick={btnTrigger}
      id={lesson.id}
    >
      <TrainingProgress
        progress={lesson?.progress ?? 0}
        locked={locked}
      />

      <Stack>
        <Typography
          variant='h4'
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {lesson.name}
        </Typography>
        <Typography
          variant='body1'
          ref={textRef}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: !openDetails ? 'nowrap' : 'wrap',
          }}
        >
          {lesson.description}
        </Typography>

        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='end'
        >
          <Stack>
            {longDesc ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenDetails(!openDetails)
                }}
                sx={SEE_MORE_SX}
              >
                {translate('actions_see_more')}{' '}
                {!openDetails ? <GoTriangleDown /> : <GoTriangleUp />}
              </Button>
            ) : null}
            <Stack
              direction='row'
              gap={2}
              flexWrap='wrap'
            >
              <Typography
                variant='body2'
                sx={MODE_TITLE_SX}
              >
                <RocketIcon
                  width={20}
                  height={20}
                />
                {lesson.type === 'practical' ? 'Part of Project' : 'Exercise'}
              </Typography>
              <Typography
                variant='body2'
                sx={DURATION_SX}
              >
                <AiOutlineClockCircle size={20} />
                {convertMinsToString(
                  convertDurationToMins(lesson.duration),
                  translate('hours'),
                  translate('minutes')
                )}
              </Typography>
            </Stack>
          </Stack>
          <Box ref={btnRef}>
            <LessonItemButton
              locked={locked}
              isLastLessonInProgress={isLastLessonInProgress}
              fetchCodeFromPrevLesson={fetchCodeFromPrevLesson}
              fetchDefaultCodeFromPrevLesson={fetchDefaultCodeFromPrevLesson}
              courseId={courseId}
              unitId={unitId}
              lesson={lesson}
              index={index}
            />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}
