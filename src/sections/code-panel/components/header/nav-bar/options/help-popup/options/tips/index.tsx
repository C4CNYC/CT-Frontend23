import { type FC } from 'react'

import { Alert, Box, Skeleton } from '@mui/material'
import { Stack } from '@mui/system'

import { EmptyContent } from '@/components'
import { useGetLessonStudentWithoutContentsQuery } from '@/redux/services/manager/lesson-student'
import { useGetPublicLessonQuery } from '@/redux/services/public-student'
import { useSelector } from '@/redux/store'

const Tips: FC = () => {
  const profile = useSelector((state) => state.global.user)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const courseId = useSelector((state) => state.codePanelGlobal.courseId)
  const { data, isLoading } = useGetLessonStudentWithoutContentsQuery(
    { id: lessonId as string },
    { skip: !lessonId || !profile }
  )
  const { data: publicData, isLoading: isPublicLoading } = useGetPublicLessonQuery(
    { id: courseId as string, lesson_id: lessonId as string },
    { skip: !lessonId || !!profile }
  )

  const lessonData = data || publicData

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <Skeleton
          variant='rounded'
          width='100%'
          height='50px'
        />
      </Stack>
    )
  }

  return (
    <Stack spacing={2}>
      {lessonData?.tips?.length ? (
        lessonData?.tips?.map((t, i) => (
          <Alert
            key={i}
            severity='info'
          >
            {t}
          </Alert>
        ))
      ) : (
        <Box height='300px'>
          <EmptyContent title='No data' />
        </Box>
      )}
    </Stack>
  )
}

export default Tips
