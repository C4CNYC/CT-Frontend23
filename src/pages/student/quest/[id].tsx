import { useEffect, useMemo, useState } from 'react'

import { Container, Link, Skeleton, SxProps, Theme, useTheme } from '@mui/material'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { Iconify, useSettingsContext } from '@/components'
import { StudentDashboardLayout } from '@/layouts/dashboard'
import { useGetTeacherListQuery } from '@/redux/services/admin/school-amdin'
import {
  useGetAssignmentStudentQuery,
  useGetAssignmentStudentPublicQuery,
} from '@/redux/services/manager/assignments-student'
import { useGetCoursQuery } from '@/redux/services/manager/courses-student'
import { useGetLessonStudentWithoutContentsQuery } from '@/redux/services/manager/lesson-student'
import { useGetModuleWithLessonsQuery } from '@/redux/services/manager/modules-student'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import LessonItem from '@/sections/module/lesson-item'
import QuestDescription from '@/sections/quest/QuestDescription'
import QuestHeader from '@/sections/quest/QuestHeader'
import QuestMain from '@/sections/quest/QuestMain'
import QuestRating from '@/sections/quest/QuestRating'
import { useTranslate } from '@/utils/translateHelper'
import { isJson } from '@root/src/utils'

Quest.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

export default function Quest(): React.ReactElement | null {
  const { query } = useRouter()
  const theme = useTheme()
  const { themeStretch } = useSettingsContext()
  const [hasContent, setHasContent] = useState(false)
  const containerSx = useMemo(() => getContainerSx(theme), [theme])
  const skeletonSx = useMemo(() => getSkeletonSx(theme), [theme])
  const profile = useSelector((state: any) => state.global.user)
  const assignmentQuery = profile
    ? useGetAssignmentStudentQuery
    : useGetAssignmentStudentPublicQuery
  const { data, isLoading } = assignmentQuery(
    { assignmentId: query.id as string },
    { skip: !query.id }
  )
  const translate = useTranslate()

  const { data: course, isLoading: isLoadingCourse } = useGetCoursQuery(
    { id: data?.course?.id as string },
    { skip: !data?.course?.id || !profile }
  )

  const { data: lesson, isLoading: isLoadingLesson } = useGetLessonStudentWithoutContentsQuery(
    { id: data?.lessonId as string },
    { skip: !data?.lessonId }
  )

  const { data: module, isLoading: isLoadingModule } = useGetModuleWithLessonsQuery(
    { id: data?.courseUnitId as string },
    { skip: !data?.courseUnitId }
  )

  const { data: teachers } = useGetTeacherListQuery(
    {
      schoolId: query.schoolId as string,
    },
    { skip: !query.schoolId }
  )

  useEffect(() => {
    if (data) {
      const content = isJson(data.description)
        ? JSON.parse(data.description).doc.content
        : data.description
      setHasContent(content.some((el: any) => el.content))
    }
  }, [data])

  if (isLoading || !data) {
    return (
      <Skeleton
        variant='rounded'
        height='600px'
      />
    )
  }

  return (
    <>
      <Head>
        <title>{translate('quest')} | CodeTribe</title>
      </Head>
      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={containerSx}
      >
        <QuestHeader type={data?.category} />
        <QuestMain
          teachers={teachers}
          questName={data.name}
        />
        {hasContent ? <QuestDescription description={data?.description} /> : null}

        {lesson ? (
          <>
            <LessonItem
              lesson={lesson}
              unitId={data?.courseUnitId ?? ''}
              locked={false}
            />
          </>
        ) : (
          ''
        )}

        {isLoadingCourse ? (
          <Skeleton
            variant='rounded'
            sx={skeletonSx}
          />
        ) : course ? (
          <QuestRating
            courseId={course?.id ?? ''}
            courseName={course?.name ?? ''}
            progress={course?.progress ?? 0}
          />
        ) : (
          ''
        )}
        <Link
          component={NextLink}
          href={STUDENT_PATH_DASHBOARD.codePanel.workSpace({
            courseId: course?.id,
            unitId: data?.courseUnitId,
            lessonId: data?.lessonId,
          })}
          underline='none'
          sx={KEEP_CODING_LINK_SX}
        >
          {translate('keep_coding')}
          <Iconify
            icon='maki:arrow'
            width={18}
            style={{ marginLeft: '3px' }}
          />
        </Link>
      </Container>
    </>
  )
}

const getContainerSx = (theme: Theme): SxProps => ({
  borderRadius: 1,
  background:
    theme.palette.mode === 'light' ? 'rgba(243, 243, 243, 0.8)' : theme.palette.background.paper,
  pt: 2,
  pb: 8,
})

const getSkeletonSx = (theme: Theme): SxProps => ({
  height: '98px',
  mt: 3,
  background: theme.palette.mode === 'light' ? '#fff' : 'initial',
  borderRadius: 2,
})

const KEEP_CODING_LINK_SX = {
  display: 'inline-flex',
  alignItems: 'center',
  color: 'inherit',
  mt: 2,
  pl: 2,
}
