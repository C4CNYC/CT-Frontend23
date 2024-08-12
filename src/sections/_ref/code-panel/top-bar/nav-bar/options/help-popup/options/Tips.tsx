import { Alert, Box, Skeleton } from '@mui/material'
import { Stack } from '@mui/system'
import { useAtom } from 'jotai'

import { EmptyContent } from '../../../../../../../../components'
import { useGetLessonStudentQuery } from '../../../../../../../../redux/services/manager/lesson-student'
import { globalCodePanelAtom } from '../../../../../atoms/global-code-panel.atom'

const Tips = (): React.ReactElement => {
  const [{ lessonId }] = useAtom(globalCodePanelAtom)
  const { data, isLoading } = useGetLessonStudentQuery({ id: lessonId },{ skip: !lessonId})

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
        <Box sx={{ height: '300px' }}>
          <EmptyContent title='No data' />
        </Box>
      )}
    </Stack>
  )
}

export default Tips
