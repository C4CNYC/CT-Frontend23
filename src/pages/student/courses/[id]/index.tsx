import { Box, Container, Skeleton, Stack } from '@mui/material'
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
              name: translate('home'),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate('sidebar_menu_catalog'),
              href: STUDENT_PATH_DASHBOARD.courses.root,
            },
            { name: data?.name ?? translate('course') },
          ]}
        />
        <Box
          sx={{
            minHeight: '100vh',
          }}
        >
          {isLoading ? (
            <Stack>
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
            </Stack>
          ) : (
            <>
              <CourseInfo
                name={data?.name ?? ''}
                description={data?.description ?? ''}
                cover={data?.cover}
                duration={'9'}
                level={data?.level ?? ''}
                lessonsCount={
                  data?.units.reduce((total, unit) => {
                    return total + unit?.lessons?.length
                  }, 0) ?? 0
                }
              />
              <Stack
                sx={{
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'column',
                    lg: 'row',
                    xl: 'row',
                  },
                  gap: { xs: 6, lg: 2, xl: 6 },
                }}
              >
                {data?.units?.length ? (
                  <>
                    <ModulesListBlock modules={data?.units} />
                    <CourseSidebar
                      duration={'9'}
                      grade='5th-10th Grade'
                      lessons={data?.total_lessons ?? 0}
                      level={data?.level ?? '-'}
                    />
                  </>
                ) : (
                  <Box
                    width='100%'
                    display='flex'
                    justifyContent='center'
                  >
                    <EmptyContent title='No modules' />
                  </Box>
                )}
              </Stack>
            </>
          )}
        </Box>
      </Container>
    </>
  )
}
