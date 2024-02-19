import { useMemo } from 'react'

import { Box, Button, Divider, Link, Skeleton, Typography, useTheme } from '@mui/material'
import { FiSettings } from '@react-icons/all-files/fi/FiSettings'
import { RiShareBoxFill } from '@react-icons/all-files/ri/RiShareBoxFill'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { useTranslate } from '@/utils/translateHelper'
import { useGetLessonQuery } from 'src/redux/services/manager/lessons-manager'

import CreateLessonDialog from '../../lessons/CreateLessonDialog/CreateLessonDialog'

import {
  ADD_SLIDE_LINK_SX,
  DETAILS_LINK_WRAPPER,
  LESSON_DETAILS_BLOCK_SX,
  LESSON_DETAILS_WRAPPER,
  VIEW_LESSON_LINK_SX,
  getLessonSettingsBtnSx,
} from './constants'

export default function LessonDetails(): React.ReactElement {
  const { lessonId } = useRouter().query
  const translate = useTranslate()
  const theme = useTheme()

  const lessonSettingsBtnSx = useMemo(() => getLessonSettingsBtnSx(theme), [theme])

  const {
    data: lesson,
    isLoading,
    isFetching,
  } = useGetLessonQuery({ id: lessonId as string }, { skip: !lessonId })

  if (isLoading || isFetching) {
    return (
      <Box sx={LESSON_DETAILS_WRAPPER}>
        <Skeleton
          variant='rectangular'
          sx={LESSON_DETAILS_BLOCK_SX}
        ></Skeleton>
        <Skeleton
          variant='rectangular'
          sx={LESSON_DETAILS_BLOCK_SX}
        ></Skeleton>
      </Box>
    )
  }

  return (
    <Box sx={LESSON_DETAILS_WRAPPER}>
      <Box sx={LESSON_DETAILS_BLOCK_SX}>
        <Box sx={(theme) => ({ bgcolor: theme.palette.background.default, mb: 2 })}>
          {lesson ? (
            <CreateLessonDialog
              isEdit
              id={lesson?.id}
              defaultValues={{
                name: lesson?.name,
                description: lesson?.description,
                active: lesson?.active,
                head: lesson?.head || '',
                tips: '',
                independent: lesson?.independent,
                type: lesson?.type,
              }}
              lessonTips={lesson.tips}
            >
              <Button
                variant='outlined'
                color='inherit'
                sx={lessonSettingsBtnSx}
              >
                {translate('lessons_settings')}
                <FiSettings size='20px' />
              </Button>
            </CreateLessonDialog>
          ) : null}
        </Box>
        <Typography
          variant='h4'
          sx={(theme) => ({ color: theme.palette.text.disabled })}
        >
          {lesson?.name}
        </Typography>

        <Divider sx={{ mb: 2, borderWidth: 1 }}></Divider>

        <Typography sx={(theme) => ({ color: theme.palette.text.disabled })}>
          {lesson?.description}
        </Typography>

        <Box sx={DETAILS_LINK_WRAPPER}>
          <Link
            component={NextLink}
            href={`${MANAGER_PATH_DASHBOARD.lessons.root}?${new URLSearchParams({ lessonId: lesson?.id as string })}`}
            underline='none'
            typography='h5'
            sx={VIEW_LESSON_LINK_SX}
          >
            {translate('modules_view_lesson')}
            <RiShareBoxFill size={22} />
          </Link>

          <Link
            component={NextLink}
            href={`${MANAGER_PATH_DASHBOARD.lessons.root}?${new URLSearchParams({ lessonId: lesson?.id as string })}`}
            underline='none'
            typography='h5'
            sx={ADD_SLIDE_LINK_SX}
          >
            {translate('modules_add_lesson_slide_link')}
          </Link>
        </Box>

        <Typography sx={(theme) => ({ color: theme.palette.text.secondary, mb: 2 })}>
          {translate('type')}: {lesson?.type}
        </Typography>
        <Typography sx={(theme) => ({ color: theme.palette.text.secondary, mb: 2 })}>
          {translate('sequence')}: {lesson?.independent ? 'Independent' : 'Non-Independent'}
        </Typography>
        <Typography sx={(theme) => ({ color: theme.palette.text.secondary, mb: 2 })}>
          {translate('lessons_starter_code')}: {translate('lessons_starter_code_from_previous')}
        </Typography>
      </Box>
      <Box sx={LESSON_DETAILS_BLOCK_SX}></Box>
    </Box>
  )
}
