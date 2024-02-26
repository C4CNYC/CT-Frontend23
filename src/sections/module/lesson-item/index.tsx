import { useState } from 'react'

import { Box, Button, Collapse, Link, Stack, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material'
import { AiOutlineClockCircle } from '@react-icons/all-files/ai/AiOutlineClockCircle'
import { GoTriangleDown } from '@react-icons/all-files/go/GoTriangleDown'
import { GoTriangleUp } from '@react-icons/all-files/go/GoTriangleUp'
import { HiLockClosed } from '@react-icons/all-files/hi2/HiLockClosed'
import { TbPlayerPlay } from '@react-icons/all-files/tb/TbPlayerPlay'
// import { useAtom } from 'jotai'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { ILesson } from '@/redux/interfaces/content.interface'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
// import {
//   IGlobalCodePanelAtom,
//   globalCodePanelAtom,
// } from '@/sections/code-panel/atoms/global-code-panel.atom'
import { useTranslate } from '@/utils/translateHelper'

import RocketIcon from '../icons/RocketIcon'

import {
  DURATION_SX,
  LINK_BTN_SX,
  LOCKED_BTN_CONT_SX,
  LOCKED_BTN_SX,
  MODE_TITLE_SX,
  SEE_MORE_SX,
  START_LINK_SX,
  getLessonContentSx,
  getLessonSx,
} from './constants'
import LessonDialog from './LessonDialog'
import TrainingProgress from './LessonProgress'

interface ILessonItemProps {
  lesson: ILesson
  unitId: string
  lastVisitedData: boolean
  locked: boolean
}

interface IUpdateCodePanelAtom {
  courseId: string
  unitId: string
  lessonId: string
}

const MAX_DESC = 50

export default function LessonItem({
  lesson,
  unitId,
  lastVisitedData,
  locked,
}: ILessonItemProps): React.ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(600))
  const [openDetails, setOpenDetails] = useState(false)
  // const [, setGlobalCodePanel] = useAtom(globalCodePanelAtom)
  const courseId = useRouter().query.id
  const [open, setOpen] = useState(false)

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  // const updateCodePanelAtom = ({ courseId, unitId, lessonId }: IUpdateCodePanelAtom) => {
  //   setGlobalCodePanel((prev: IGlobalCodePanelAtom) => ({
  //     ...prev,
  //     courseId,
  //     unitId,
  //     lessonId,
  //   }))
  // }

  const translate = useTranslate()

  return (
    <Stack sx={getLessonSx(theme)}>
      <TrainingProgress
        progress={lesson?.progress ?? 0}
        locked={locked}
      />
      <Stack sx={getLessonContentSx(isMobile)}>
        <Stack>
          <Typography
            variant='h4'
            mb={1}
          >
            {lesson.name}
          </Typography>
          <Typography
            variant='body1'
            mb={lesson?.description?.length < MAX_DESC ? 3 : 0}
          >
            {lesson?.description?.length < MAX_DESC
              ? lesson?.description
              : `${lesson?.description?.slice(0, 47)} ${openDetails ? '' : '...'}`}
          </Typography>
          {lesson?.description?.length > MAX_DESC ? (
            <>
              <Collapse in={openDetails}>{lesson?.description?.slice(47)}</Collapse>
              <Button
                onClick={() => {
                  setOpenDetails(!openDetails)
                }}
                sx={SEE_MORE_SX}
              >
                See more {!openDetails ? <GoTriangleDown /> : <GoTriangleUp />}
              </Button>
            </>
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
              20 mins
            </Typography>
          </Stack>
        </Stack>
        {!locked ? (
          <Link
            component={NextLink}
            href={STUDENT_PATH_DASHBOARD.codePanel.workSpace({
              courseId: courseId as string,
              unitId,
              lessonId: lesson.id,
            })}
            underline='none'
            sx={START_LINK_SX}
          >
            <Typography variant='h5'> {translate('actions_start')} </Typography>
            <Box sx={LINK_BTN_SX}>
              <TbPlayerPlay
                size={30}
                style={{ color: '#364954' }}
              />
            </Box>
          </Link>
        ) : (
          <>
            <Box
              sx={LOCKED_BTN_CONT_SX}
              onClick={() => {
                openDialog()
              }}
            >
              <Typography variant='h5'>{translate('actions_start')}</Typography>
              <Box sx={LOCKED_BTN_SX}>
                <HiLockClosed
                  size={30}
                  style={{ color: '#C4CDD5' }}
                />
              </Box>
            </Box>
            <LessonDialog
              open={open}
              closeDialog={closeDialog}
              link={STUDENT_PATH_DASHBOARD.codePanel.workSpace({
                courseId: courseId as string,
                unitId,
                lessonId: lesson.id,
              })}
            />
          </>
        )}
      </Stack>
    </Stack>
  )
}
