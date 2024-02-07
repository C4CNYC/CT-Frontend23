import { useRouter } from "next/router";

import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { useGetLessonQuery } from 'src/redux/services/manager/lessons-manager'
import { FiSettings } from '@react-icons/all-files/fi/FiSettings'
import { useTranslate } from '@/utils/translateHelper'

export default function LessonDetails(): React.ReactElement {
  const { lessonId } = useRouter().query
  const translate = useTranslate()

  const { data: lesson, isLoading: isLessonLoading } = useGetLessonQuery(
    { id: lessonId as string },
    { skip: !lessonId }
  )

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ p: 2, border: '1px solid', height: '90vh', borderRadius: 2 }}>
        <Box sx={(theme) => ({ bgcolor: theme.palette.background.default, mb: 2 })}>
          <Button
            variant='outlined'
            color='inherit'
            sx={{
              width: 300,
              justifyContent: 'flex-start',
              p: 1.5,
              fontWeight: 500,
              fontSize: '1rem',
              whiteSpace: 'nowrap',
              gap: 1,
            }}
          >
            <FiSettings size='20px' />
            {translate('lesson_settup_settings')}
          </Button>
        </Box>
        <Typography variant='h4'>{lesson?.name}</Typography>
        <Divider sx={{ mb: 2 }}></Divider>
        <Typography>{lesson?.description}</Typography>
        <Typography>Type: {lesson?.type}</Typography>
        <Typography>Sequence: {lesson?.independent}</Typography>
      </Box>
    </Box>
  )
}
