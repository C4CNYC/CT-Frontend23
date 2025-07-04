import { useMemo } from 'react'

import { Box, Container, Skeleton } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { CustomBreadcrumbs, EmptyContent, useSettingsContext } from '@/components'
import { StudentDashboardLayout } from '@/layouts/dashboard'
import { useGetPublicCourseContentQuery } from '@/redux/services/public-student'
import { useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import CourseSidebar from '@/sections/course/course-sidebar'
import CourseInfo from '@/sections/course/CourseInfo'
import ModulesListBlock from '@/sections/course/modules-list'
import { useTranslate } from '@/utils/translateHelper'
import { useGetStudentProgressQuery } from '@root/src/redux/services/manager/lesson-student'
import { convertDurationToMins } from '@root/src/utils/convertDurationToMins'
import { progressGuestGet } from '@root/src/utils/progressLocalStorage'

CoursePage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

export default function CoursePage(): React.ReactElement {
  const router = useRouter()
  const { themeStretch } = useSettingsContext()
  const profile = useSelector((state) => state.global.user)
  const { data: publicContent, isLoading: isPublicLoading } = useGetPublicCourseContentQuery(
    {
      id: router.query.id as string,
    },
    { skip: !router.query.id }
  )
  const { data: studentProgress } = useGetStudentProgressQuery(undefined, { skip: !profile })

  function getLessonProgress(lessonId: string, challangeCount: number, slideCount: number) {
    if (studentProgress) {
      let p = studentProgress.find((p) => p.lessonId === lessonId)
      return p ? Math.round((p.numberOfCompletedChallenges / challangeCount) * 100) : 0
    } else {
      return Math.round((progressGuestGet(lessonId) / slideCount) * 100)
    }
  }
  // Merge student progress with course content
  const data = useMemo(() => {
    let data = publicContent
    if (!data || !data?.units) return publicContent
    const updatedUnits = data.units.map((unit) => {
      const updatedLessons = unit.lessons.map((lesson) => {
        let progress = getLessonProgress(
          lesson.id,
          lesson.meta.challenges as number,
          lesson.contents?.length || 10
        )
        return { ...lesson, progress }
      })

      // Sum up all lesson.progress values (default to 0 if not set)
      const totalProgress =
        updatedLessons.reduce((sum, lesson) => sum + (lesson.progress || 0), 0) /
        (updatedLessons.length || 1)

      return {
        ...unit,
        lessons: updatedLessons,
        progress: totalProgress,
      }
    })
    return { ...data, units: updatedUnits }
  }, [studentProgress, publicContent])
  const isLoading = isPublicLoading
  const translate = useTranslate()

  return (
    <>
      <Head>
        <title>{data?.name ?? translate('course')} | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          links={[
            {
              name: translate('sidebar_menu_catalog'),
              href: STUDENT_PATH_DASHBOARD.courses.root,
            },
            { name: data?.name ?? translate('course') },
          ]}
        />

        {isLoading || !data ? (
          <Skeleton
            variant='rounded'
            sx={{
              mb: { sx: '24px', sm: '40px' },
              height: {
                xs: '954px',
                sm: '483px',
                md: '400px',
              },
              width: '100%',
            }}
          />
        ) : (
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 1, md: 2, lg: 3 },
              gridTemplateColumns: { xs: 'auto', md: 'auto 250px' },
            }}
          >
            <Box overflow={'hidden'}>
              <CourseInfo course={data} />
              {data.units?.length ? (
                <ModulesListBlock modules={data?.units} />
              ) : (
                <EmptyContent
                  title='No modules'
                  m='0 auto'
                />
              )}
            </Box>
            <Box>
              <CourseSidebar
                durationInMins={data.units
                  .map((unit) => convertDurationToMins(unit.duration))
                  .reduce((acc, unitDuration) => acc + unitDuration, 0)}
                grade='5th-10th Grade'
                lessons={
                  data?.total_lessons ??
                  data?.units
                    .map((u) => u?.lessonToUnits?.length || 0)
                    .reduce((a, l) => (a + l ? l : 0), 0) ??
                  0
                }
                level={data?.level ?? '-'}
                audience={data?.audience}
                forTeachers={data?.for_teachers}
              />
            </Box>
          </Box>
        )}
      </Container>
    </>
  )
}
