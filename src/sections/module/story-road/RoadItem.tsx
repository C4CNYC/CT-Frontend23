import { useEffect, useMemo, useState } from 'react'

import { Box, Button, CircularProgress, Collapse, Stack, Typography, useTheme } from '@mui/material'
import { AiOutlineClockCircle } from '@react-icons/all-files/ai/AiOutlineClockCircle'
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown'
import { FaChevronUp } from '@react-icons/all-files/fa/FaChevronUp'
import { useRouter } from 'next/router'

import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'

import CompleatedIcon from '../icons/CompleatedIcon'
import RocketIcon from '../icons/RocketIcon'
import LessonDialog from '../lesson-item/LessonDialog'

import {
  DESCRIPTION_GRADIENT_TEXT_SX,
  LESSON_TIME_SX,
  PROGRES_BOX_SX,
  getDescriptionBoxSx,
  getIconWrapperSx,
  getRoadBoxSx,
  getSeeMoreBtnSx,
} from './constants'
import RoadItemBtn from './RoadItemBtn'

interface RoadItemProps {
  compleated: boolean
  locked: boolean
  progress: number
  oddItem: boolean
  lastActive: boolean
  firstItem?: boolean
  lastItem?: boolean
  name: string
  description: string
  lessonId: string
  type: 'practical' | 'exercise'
}

const RoadItem = ({
  compleated,
  locked,
  progress,
  oddItem,
  firstItem = false,
  lastActive,
  lastItem = false,
  name,
  description,
  lessonId,
  type,
}: RoadItemProps) => {
  const theme = useTheme()
  const { push, query } = useRouter()
  const [compleatedColor, setCompleatedColor] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const projectTime = '20 mins'

  const roadBoxSx = useMemo(
    () => getRoadBoxSx(firstItem, lastItem, oddItem, compleatedColor),
    [compleatedColor]
  )
  const iconWrapperSx = useMemo(() => getIconWrapperSx(compleated), [compleated])

  const seeMoreBtnSx = useMemo(() => getSeeMoreBtnSx(theme), [theme])

  const redirectToCodePanel = () => {
    if (locked && !lastActive) {
      openDialog()
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

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!locked) {
      setCompleatedColor('')
    } else {
      setCompleatedColor('Grey')
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
            id='compleated'
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
        <Box sx={PROGRES_BOX_SX}>
          <CircularProgress
            size={70}
            value={progress < 5 ? 5 : progress}
            variant='determinate'
            thickness={7}
            sx={{
              'svg circle': {
                stroke: compleated ? 'url(#compleated)' : 'url(#started)',
              },
            }}
          />
          <Box sx={iconWrapperSx}>
            {compleated ? (
              <CompleatedIcon
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
          compleated={compleated}
          lastActive={lastActive}
          locked={locked}
          redirectToCodePanel={redirectToCodePanel}
        />
      </Box>
      <Stack
        pl={lastActive ? 2 : 5}
        mt={!firstItem && !oddItem ? 5 : 0}
      >
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
          See more
          {!isOpen ? <FaChevronDown size={14} /> : <FaChevronUp size={14} />}
        </Button>
        <Collapse in={isOpen}>
          <Box sx={getDescriptionBoxSx}>
            <Typography mb={1}>{description}</Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Typography sx={DESCRIPTION_GRADIENT_TEXT_SX}>
                <RocketIcon
                  width={20}
                  height={20}
                />
                {type === 'practical' ? 'Part of Project' : 'Exercise'}
              </Typography>
              <Typography sx={LESSON_TIME_SX}>
                <AiOutlineClockCircle size={20} />
                {projectTime}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Stack>
      <LessonDialog
        open={open}
        closeDialog={closeDialog}
        link={STUDENT_PATH_DASHBOARD.codePanel.workSpace({
          courseId: query.id as string,
          unitId: query.unitId as string,
          lessonId,
        })}
      />
    </Box>
  )
}

export default RoadItem
