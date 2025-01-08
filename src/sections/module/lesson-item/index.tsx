import { useEffect, useRef, useState } from 'react'

import { Button, Collapse, Stack, Typography, useMediaQuery } from '@mui/material'
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
  const { user } = useAuthContext()
  const { push } = useRouter()
  const translate = useTranslate()
  const dispatch = useDispatch()
  const theme = useTheme()

  const [openDetails, setOpenDetails] = useState(false)
  const [maxDesc, setMaxDesc] = useState(50)
  const descRef = useRef<HTMLElement | null>(null)

  const courseId = useRouter().query.id
  const lastLessonProgress = prevLesson?.progress ?? 100
  const isLastLessonInProgress = lastLessonProgress <= 90
  const isTablet = useMediaQuery(theme.breakpoints.up('xl'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

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

  const ellipsisHandler = () => {
    if (descRef.current) {
      return descRef.current.offsetWidth < descRef.current.scrollWidth
    }
    return false
  }

  useEffect(() => {
    if (isTablet) {
      setMaxDesc(200)
    }
    if (isDesktop) {
      setMaxDesc(400)
    }
  }, [])

  return (
    <Stack sx={getLessonSx(theme)}>
      <TrainingProgress
        progress={lesson?.progress ?? 0}
        locked={locked}
      />

      <Stack>
        <Typography
          variant='h4'
          mb={1}
        >
          {lesson.name}
        </Typography>
        <Typography
          variant='body1'
          mb={lesson?.description?.length < maxDesc ? 1 : 0}
          ref={descRef}
          sx={{ textOverflow: 'ellipsis' }}
          noWrap
        >
          {lesson.description}
        </Typography>
        {ellipsisHandler() ? (
          <>
            <Collapse in={openDetails}>{lesson.description}</Collapse>
            <Button
              onClick={() => {
                setOpenDetails(!openDetails)
              }}
              sx={SEE_MORE_SX}
            >
              {translate('actions_see_more')} {!openDetails ? <GoTriangleDown /> : <GoTriangleUp />}
            </Button>
          </>
        ) : null}

        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='end'
        >
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
              20 mins
            </Typography>
          </Stack>
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
        </Stack>
      </Stack>
    </Stack>
  )
}
