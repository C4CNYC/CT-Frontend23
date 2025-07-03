import { useMemo } from 'react'

import { Stack, Typography, useTheme } from '@mui/material'

import { IModule, IModuleContent } from '@/redux/interfaces/content.interface'
import { useTranslate } from '@/utils/translateHelper'
import OnlyAdmin from '@root/src/auth/OnlyAdmin'

import AuthorsSection from './AuthorsSection'
import BriefSection from './BriefSection'
import CollapsedItem from './components/CollasedItem'
import QuizPanel from './quiz-panel'
import TeacherToolbox from './TeacherToolbox'

interface IModuleSidebarProps {
  module: IModule
  moduleContent?: IModuleContent
}

// until the api will be ready

const level = 'Beginner'
const grade = '6th-10th Grade'
export default function ModuleSidebar({
  module,
  moduleContent,
}: IModuleSidebarProps): React.ReactElement {
  const theme = useTheme()
  const translate = useTranslate()
  const {
    duration,
    initial_enrolled: enrolled,
    initial_likes: likes,
    initial_stars: stars,
    lessons,
    description,
    age,
    level,
    customLevel,
    customAge,
    grading,
    brief,
    audience,
    authors,
  } = module

  const moduleDuration = useMemo(
    () =>
      duration
        ? Object.entries(duration)
            .map(([dataType, count]) => {
              ;`${count} ${dataType}`
            })
            .join(' ')
        : '.5 hour',
    [duration]
  )
  return (
    <Stack
      maxWidth={300}
      gap={2}
      m={'0 auto'}
    >
      <OnlyAdmin>
        <CollapsedItem
          title={translate('courses_author_and_ranking')}
          isDefaultOpen={true}
        >
          <AuthorsSection
            authors={authors || null}
            certificate={enrolled ?? 0}
            likes={likes ?? 0}
            rated={stars ?? 0}
          />
        </CollapsedItem>
      </OnlyAdmin>
      <CollapsedItem title={translate('courses_brief')}>
        <BriefSection
          lessons={`${lessons?.length} ${translate('lessons')}`}
          grade={customAge || age || '6th-10th Grade'}
          level={customLevel || level || 'Beginner'}
          duration={moduleDuration ?? '.5 hour'}
          brief={brief || ''}
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
          {audience || description}
        </Typography>
      </CollapsedItem>
      <OnlyAdmin>
        <QuizPanel lessons={lessons ?? []} />
      </OnlyAdmin>
      <CollapsedItem title={translate('courses_teacher_toolbox')}>
        <TeacherToolbox
          teacherForum={moduleContent?.teacher_forum}
          teacherSlides={moduleContent?.teacher_slides}
          lessonPlans={moduleContent?.lesson_plans}
        />
      </CollapsedItem>
    </Stack>
  )
}
