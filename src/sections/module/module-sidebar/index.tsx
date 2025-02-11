import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

import { ILesson } from '@/redux/interfaces/content.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'
import OnlyAdmin from '@root/src/auth/OnlyAdmin'

import AuthorsSection from './AuthorsSection'
import BriefSection from './BriefSection'
import CollapsedItem from './components/CollasedItem'
import QuizPanel from './quiz-panel'
import TeacherToolbox from './TeacherToolbox'

interface IModuleSidebarProps {
  description: string
  level: string
  lessonCount: string
  grade: string
  duration: string | null
  teacherSlides?: string
  lessonPlans?: string
  teacherForum: string
  certificate: number
  likes: number
  rated: number
  lessons?: Array<ILesson & BaseResponseInterface>
}

export default function ModuleSidebar({
  description,
  level,
  lessonCount,
  duration,
  grade,
  certificate,
  likes,
  rated,
  teacherSlides,
  teacherForum,
  lessonPlans,
  lessons,
}: IModuleSidebarProps): React.ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xl'))
  const translate = useTranslate()
  return (
    <Stack
      maxWidth={350}
      minWidth={150}
      gap={2}
      m={isMobile ? '0 auto' : ''}
    >
      <OnlyAdmin>
        <CollapsedItem
          title={translate('courses_author_and_ranking')}
          isDefaultOpen={true}
        >
          <AuthorsSection
            certificate={certificate ?? 0}
            likes={likes ?? 0}
            rated={rated ?? 0}
          />
        </CollapsedItem>
      </OnlyAdmin>
      <CollapsedItem title={translate('courses_brief')}>
        <BriefSection
          lessons={lessonCount}
          grade={grade}
          level={level}
          duration={duration ?? '20 min'}
        />
      </CollapsedItem>
      <CollapsedItem title={translate('courses_course_who_is_this_for')}>
        <Typography
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: theme.palette.mode === 'light' ? '#F8F8F8' : theme.palette.background.paper,
          }}
        >
          {description}
        </Typography>
      </CollapsedItem>
      <OnlyAdmin>
        {' '}
        <QuizPanel lessons={lessons ?? []} />
      </OnlyAdmin>
      <CollapsedItem title={translate('courses_teacher_toolbox')}>
        <TeacherToolbox
          teacherForum={teacherForum}
          teacherSlides={teacherSlides}
          lessonPlans={lessonPlans}
        />
      </CollapsedItem>
    </Stack>
  )
}
