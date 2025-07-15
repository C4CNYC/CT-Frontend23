import { useEffect, useMemo, useState } from 'react'

import { Box, Button, CircularProgress, Collapse, Stack, Typography, useTheme } from '@mui/material'
import { AiOutlineClockCircle } from '@react-icons/all-files/ai/AiOutlineClockCircle'
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown'
import { FaChevronUp } from '@react-icons/all-files/fa/FaChevronUp'
import { useRouter } from 'next/router'

import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'
import { useTranslate } from '@root/src/utils/translateHelper'

import CompletedIcon from '../icons/CompletedIcon'
import RocketIcon from '../icons/RocketIcon'

import {
  DESCRIPTION_GRADIENT_TEXT_SX,
  LESSON_TIME_SX,
  PROGRESS_BOX_SX,
  getDescriptionBoxSx,
  getIconWrapperSx,
  getMobileRoadBoxSx,
  getSeeMoreBtnSx,
} from './constants'
import RoadItemBtn from './RoadItemBtn'

interface RoadItemMobileProps {
  firstItem: boolean
  completed: boolean
  locked: boolean
  progress: number
  lastActive: boolean
  lastItem?: boolean
  name: string
  description: string
  lessonId: string
  type: LessonType
}

const PROJECT_TIME = '20 mins'

const RoadItemMobile = ({
  completed,
  locked,
  progress,
  lastActive,
  lastItem = false,
  name,
  description,
  lessonId,
  firstItem = false,
  type,
}: RoadItemMobileProps) => {
  const theme = useTheme()
  const { query, push } = useRouter()
  const translate = useTranslate()

  const [completedColor, setCompletedColor] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const roadBoxSx = useMemo(
    () => getMobileRoadBoxSx(lastItem, firstItem, completedColor),
    [completedColor]
  )
  const iconWrapperSx = useMemo(() => getIconWrapperSx(completed), [completed])
  const seeMoreBtnSx = useMemo(() => getSeeMoreBtnSx(theme), [theme])
  const descriptionGradientTextSx = {
    ...DESCRIPTION_GRADIENT_TEXT_SX,
    fontSize: '14px',
  }
  const lessonTimeSx = { ...LESSON_TIME_SX, fontSize: '14px' }

  const redirectToCodePanel = () => {
    if (locked && !lastActive) {
      push(
        STUDENT_PATH_DASHBOARD.codePanel.workSpace({
          courseId: query.id as string,
          unitId: query.unit as string,
          lessonId: lessonId,
        })
      )
    } else {
      void push(
        STUDENT_PATH_DASHBOARD.codePanel.workSpace({
          courseId: query.id as string,
          unitId: query.unitId as string,
          lessonId,
        })
      )
    }
  }

  useEffect(() => {
    if (!locked) {
      setCompletedColor('')
    } else {
      setCompletedColor('Grey')
    }
  }, [locked])

  return (
    <Box sx={roadBoxSx}>
      <svg
        display='hidden'
        width={0}
        height={0}
      >
        <defs>
          <linearGradient
            id='completed'
            x1='50%'
            y1='0%'
            x2='0%'
            y2='50%'
          >
            <stop
              offset='0%'
              stopColor={'#1675C9'}
            />
            <stop
              offset='100%'
              stopColor={'rgba(24, 167, 246, 0.71)'}
            />
          </linearGradient>
        </defs>
      </svg>
      <svg
        display='hidden'
        width={0}
        height={0}
      >
        <defs>
          <linearGradient
            id='started'
            x1='50%'
            y1='0%'
            x2='0%'
            y2='50%'
          >
            <stop
              offset='0%'
              stopColor={'#1CE886'}
            />
            <stop
              offset='100%'
              stopColor={'#3CA622'}
            />
          </linearGradient>
        </defs>
      </svg>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={PROGRESS_BOX_SX}>
          <CircularProgress
            size={70}
            value={progress < 5 ? 5 : progress}
            variant='determinate'
            thickness={7}
            sx={{
              'svg circle': {
                stroke: completed ? 'url(#completed)' : 'url(#started)',
              },
            }}
          />
          <Box sx={iconWrapperSx}>
            {completed ? (
              <CompletedIcon
                width={40}
                height={40}
              />
            ) : (
              <RocketIcon
                width={32}
                height={32}
              />
            )}
          </Box>
        </Box>
        <RoadItemBtn
          completed={completed}
          lastActive={lastActive}
          locked={locked}
          isMobile
          getLinkToCodePanel={redirectToCodePanel}
        />
      </Box>
      <Stack ml={lastActive ? -5 : 1}>
        <Typography
          variant='h5'
          pl={1}
        >
          {name}
        </Typography>
        <Button
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          disableRipple
          sx={seeMoreBtnSx}
        >
          {translate('actions_see_more')}{' '}
          {!isOpen ? <FaChevronDown size={14} /> : <FaChevronUp size={14} />}
        </Button>
        <Collapse in={isOpen}>
          <Box sx={getDescriptionBoxSx}>
            <Typography mb={1}>{description}</Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Typography sx={descriptionGradientTextSx}>
                <RocketIcon
                  width={20}
                  height={20}
                />
                {type === 'practical' ? 'Part of Project' : 'Exercise'}
              </Typography>
              <Typography sx={lessonTimeSx}>
                <AiOutlineClockCircle size={20} />
                {PROJECT_TIME}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Stack>
    </Box>
  )
}

export default RoadItemMobile
