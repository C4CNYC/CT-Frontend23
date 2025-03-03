import { Box, Container, Skeleton } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { CustomBreadcrumbs, EmptyContent, useSettingsContext } from '@/components'
import { StudentDashboardLayout } from '@/layouts/dashboard'
import { useGetCoursContentQuery } from '@/redux/services/manager/courses-student'
import { useGetPublicCourseContentQuery } from '@/redux/services/public-student'
import { useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import CourseSidebar from '@/sections/course/course-sidebar'
import CourseInfo from '@/sections/course/CourseInfo'
import ModulesListBlock from '@/sections/course/modules-list'
import { useTranslate } from '@/utils/translateHelper'
import { convertDurationToMins } from '@root/src/utils/convertDurationToMins'

CoursePage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

export default function CoursePage(): React.ReactElement {
  const router = useRouter()
  const { themeStretch } = useSettingsContext()
  const profile = useSelector((state) => state.global.user)
  const { data: courseContent, isLoading: isContentLoading } = useGetCoursContentQuery(
    {
      id: router.query.id as string,
    },
    { skip: !router.query.id || !profile }
  )
  const { data: publicContent, isLoading: isPublicLoading } = useGetPublicCourseContentQuery(
    {
      id: router.query.id as string,
    },
    { skip: !router.query.id || !!profile }
  )

  const data = courseContent ?? publicContent
  const isLoading = isContentLoading ?? isPublicLoading
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
              />
            </Box>
          </Box>
        )}
      </Container>
    </>
  )
}
