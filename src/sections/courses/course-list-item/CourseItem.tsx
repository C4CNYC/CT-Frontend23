import { useState } from 'react'

import { Box, Button, Collapse, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { SlArrowDown } from '@react-icons/all-files/sl/SlArrowDown'
import { SlArrowUp } from '@react-icons/all-files/sl/SlArrowUp'
import { useRouter } from 'next/router'

import { ICourseElement } from '@/redux/interfaces/content.interface'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useTranslate } from '@/utils/translateHelper'

import CourseAvatar from './CourseAvarar'
import CourseButtons from './CourseButtons'
import CourseHeader from './CourseHeader'
import CourseInfo from './CourseInfo'
import CourseStatistics from './CourseStatistics'

interface Props {
  course: ICourseElement
}

const MAX_DESCRIPTION_LENGTH = 80

export default function CoursesItem({ course }: Props): React.ReactElement {
  const { push } = useRouter()
  const theme = useTheme()
  const translate = useTranslate()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [open, setOpen] = useState(false)

  const isLight = theme.palette.mode === 'light'

  const redirect = (): void => {
    push(`${STUDENT_PATH_DASHBOARD.courses.course(course.id)}`)
  }
  return (
    <Stack
      onClick={redirect}
      sx={{
        background: isLight ? '#ECF4FF' : theme.palette.background.paper,
        borderRadius: '25px',
        color: isLight ? '#212B36' : theme.palette.text.primary,
        cursor: 'pointer',
        p: {
          xs: '20px 20px 20px 20px',
          sm: '20px 20px 20px 20px',
          md: '20px 55px 20px 40px',
        },
      }}
    >
      {isMobile && (
        <Stack
          alignItems='center'
          mb={3}
          mt={1}
        >
          <CourseAvatar course={course} />
        </Stack>
      )}
      {course.progress ? <CourseHeader progress={course.progress} /> : null}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: 'none', sm: 'none', md: '700px' },
          }}
        >
          <Typography
            variant='h4'
            sx={{ textTransform: 'uppercase', pb: '10px', color: 'inherit' }}
          >
            {course.name}
          </Typography>
          <Typography
            variant='body2'
            sx={{ pb: !open ? 1 : 0, color: 'inherit' }}
          >
            {course.description.length > MAX_DESCRIPTION_LENGTH && !open
              ? `${course.description.slice(0, MAX_DESCRIPTION_LENGTH)}... `
              : course.description}
          </Typography>
          <Collapse in={open}>
            <CourseStatistics
              likesCount={course.initial_likes + parseInt(course.likes_count ?? '0')}
              enrolledCount={course.initial_enrolled}
              starsCount={course.initial_stars}
            />
          </Collapse>
          <Button
            sx={{
              fontSize: '1rem',
              color: isLight ? '#364954' : theme.palette.text.primary,
              gap: 1,
              '&:hover': {
                background: 'none',
              },
            }}
            onClick={(e) => {
              e.stopPropagation()
              setOpen(!open)
            }}
          >
            {open ? translate('actions_show_less') : translate('actions_see_more')}
            {open ? <SlArrowUp /> : <SlArrowDown />}
          </Button>
          <CourseButtons
            redirect={redirect}
            progress={course.progress}
            courseId={course.id}
            isLight={isLight}
          />
          <CourseInfo course={course} />
        </Box>
        {!isMobile && <CourseAvatar course={course} />}
      </Box>
    </Stack>
  )
}
