import { useMemo } from 'react'

import { LoadingButton } from '@mui/lab'
import { Button, Stack } from '@mui/material'

import { useTranslate } from '@/utils/translateHelper'

import { useContinueCourse } from '../hooks/useContinueCourse'

import { CONTINUE_COURSE_BTN_SX, ENROLL_COURSE_BTN_SX, getExploreCourseBtnSX } from './constants'

interface Props {
  redirect: () => void
  progress: number | null
  courseId: string
  isLight: boolean
  profile?: any
}

export default function CourseButtons({
  redirect,
  progress,
  courseId,
  isLight,
  profile,
}: Props): React.ReactElement {
  const translate = useTranslate()
  const exploreCourseBtnSx = useMemo(() => getExploreCourseBtnSX(isLight), [isLight])

  const { continueCourse, isLoading } = useContinueCourse(courseId, profile?.id || '')

  return (
    <Stack
      direction='row'
      sx={{ gap: { xs: 1, sm: 3 }, pb: 3, pt: 2 }}
    >
      {progress && progress > 0 ? (
        <LoadingButton
          loading={isLoading}
          sx={CONTINUE_COURSE_BTN_SX}
          variant='outlined'
          disabled={isLoading}
          onClick={async (e) => {
            e.stopPropagation()
            e.preventDefault()

            await continueCourse()
          }}
        >
          {translate('actions_continue')} 🙌🏾
        </LoadingButton>
      ) : (
        <Button
          onClick={redirect}
          variant='outlined'
          sx={ENROLL_COURSE_BTN_SX}
        >
          {translate('actions_enroll_now')} 👊🏽
        </Button>
      )}
      <Button
        onClick={redirect}
        variant='outlined'
        sx={exploreCourseBtnSx}
      >
        {translate('actions_explore')}
      </Button>
    </Stack>
  )
}
