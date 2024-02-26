import { type FC } from 'react'

import { Alert, Box, Skeleton } from '@mui/material'
import { Stack } from '@mui/system'

import { EmptyContent } from '@/components'
import { useGetLessonStudentQuery } from '@/redux/services/manager/lesson-student'
import { useSelector } from '@/redux/store'

const Tips: FC = () => {
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const { data, isLoading } = useGetLessonStudentQuery(
    { id: lessonId as string },
    { skip: !lessonId }
  )

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
      {data?.tips.length ? (
        data?.tips?.map((t, i) => (
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
