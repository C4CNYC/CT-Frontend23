import { Box, Button, useTheme } from '@mui/material'
import { Container } from '@mui/system'
import Head from 'next/head'

import { useAuthContext } from '@/auth/useAuthContext'
import {
  CustomBreadcrumbs,
  EmptyContent,
  Iconify,
  SimpleInfiniteList,
  useSettingsContext,
} from '@/components'
import { DEFAULT_TAKE_PER_PAGE, FilterMode, useFilters } from '@/hooks'
import DashboardLayout from '@/layouts/dashboard/DashboardLayout'
import { useGetAdminCoursesQuery } from '@/redux/services/admin/courses-admin'
import { ICourseSearchParams } from '@/redux/services/interfaces/courseUnits.interface'
// import { useGetPublicCoursesQuery } from '@/redux/services/manager/courses-manager'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { CourseCard } from '@/sections/dashboard/courses/cards'
import CreateCourseDialog from '@/sections/dashboard/courses/CreateCourseDialog'
import FilterCourses from '@/sections/dashboard/courses/filter'
import SkeletonCourses from '@/sections/dashboard/courses/skeletonCourses'
import SkeletonList from '@/sections/dashboard/skeleton/skeletonList'
import { useTranslate } from '@/utils/translateHelper'
import { useIsAdmin } from '@root/src/lib/use-is-admin'

CoursesListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function CoursesListPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext()
  const translate = useTranslate()
  const { isAdmin } = useIsAdmin()
  const { user } = useAuthContext()
  const { filters, setFilter } = useFilters<ICourseSearchParams>(
    {
      name: '',
      school_id: '',
    },
    FilterMode.global
  )
  const { data, isLoading, isFetching, refetch } = useGetAdminCoursesQuery(filters)
  // const {
  //   data: publicCourses,
  //   isLoading: isPublicLoading,
  //   isFetching: isPublicFetching,
  // } = useGetPublicCoursesQuery(filters)

  const theme = useTheme()
  const isRTL = theme.direction === 'rtl'

  if (isLoading) {
    return (
      <SkeletonList
        item={<SkeletonCourses />}
        count={DEFAULT_TAKE_PER_PAGE}
      />
    )
  }

  // if (!data?.data.length /*&& !publicCourses?.data.length*/) {
  //   return <EmptyContent title='You have no courses' />
  // }

  return (
    <>
      <Head>
        <title> {translate('courses')} | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading=''
          links={[
            {
              name: translate('home'),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate('courses'),
              href: MANAGER_PATH_DASHBOARD.courses.root,
            },
          ]}
          action={
            isAdmin ? (
              <CreateCourseDialog
                id=''
                refetch={refetch}
              >
                <Button
                  variant='contained'
                  startIcon={
                    <Iconify
                      icon='eva:plus-fill'
                      sx={{
                        ...(isRTL && {
                          ml: 1,
                        }),
                      }}
                    />
                  }
                >
                  {translate('courses_add')}
                </Button>
              </CreateCourseDialog>
            ) : (
              ''
            )
          }
        />
        <FilterCourses
          filters={filters}
          setFilter={setFilter}
        />
        {!data?.data.length ? (
          <EmptyContent title='You have no courses' />
        ) : (
          <SimpleInfiniteList
            hasNextPage={/*publicCourses?.meta.hasNextPage ??*/ data?.meta.hasNextPage ?? false}
            onLoadMore={() => {
              // if (publicCourses?.meta.take !== Number(filters?.take)) return
              setFilter('take', Number(filters.take) + DEFAULT_TAKE_PER_PAGE)
            }}
            loading={/*isPublicLoading ?? isPublicFetching ??*/ isLoading ?? isFetching}
          >
            <Box
              sx={{
                gap: 3,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
              }}
            >
              {isAdmin ? (
                <>
                  {/* {publicCourses?.data.map((course, index) => (
                  <CourseCard
                    key={index}
                    course={course}
                  />
                ))} */}
                  {data?.data.map((course, index) => (
                    <CourseCard
                      key={index}
                      course={course}
                      refetch={refetch}
                    />
                  ))}
                </>
              ) : null}
              {isFetching
                ? Array(24)
                    .fill(null)
                    .map((v, i) => <SkeletonCourses key={i} />)
                : null}
            </Box>
          </SimpleInfiniteList>
        )}
      </Container>
    </>
  )
}
