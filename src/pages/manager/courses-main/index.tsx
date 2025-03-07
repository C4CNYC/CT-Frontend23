import { Box, Button } from '@mui/material'
import { Container } from '@mui/system'
import { FaPlus } from '@react-icons/all-files/fa6/FaPlus'
import Head from 'next/head'

import { DEFAULT_TAKE_PER_PAGE, FilterMode, useFilters } from '@/hooks'
import DashboardLayout from '@/layouts/dashboard/DashboardLayout'
import { useGetAdminCoursesQuery } from '@/redux/services/admin/courses-admin'
import { ICourseSearchParams } from '@/redux/services/interfaces/courseUnits.interface'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { CourseCard } from '@/sections/dashboard/courses/cards'
import CreateCourseDialog from '@/sections/dashboard/courses/CreateCourseDialog'
import FilterCourses from '@/sections/dashboard/courses/filter'
import SkeletonCourses from '@/sections/dashboard/courses/skeletonCourses'
import SkeletonList from '@/sections/dashboard/skeleton/skeletonList'
import { useTranslate } from '@/utils/translateHelper'
import {
  CustomBreadcrumbs,
  EmptyContent,
  SimpleInfiniteList,
  useSettingsContext,
} from '@root/src/components'
import { useIsAdmin } from '@root/src/lib/use-is-admin'

CoursesListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function CoursesListPage(): React.ReactElement {
  const translate = useTranslate()
  const { themeStretch } = useSettingsContext()
  const { isAdmin } = useIsAdmin()

  const { filters, setFilter } = useFilters<ICourseSearchParams>(
    {
      name: '',
      school_id: '',
    },
    FilterMode.global
  )
  const { data, isLoading, isFetching, refetch } = useGetAdminCoursesQuery(filters)

  if (isLoading) {
    return (
      <SkeletonList
        item={<SkeletonCourses />}
        count={DEFAULT_TAKE_PER_PAGE}
      />
    )
  }

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
                  startIcon={<FaPlus />}
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
            hasNextPage={data?.meta.hasNextPage ?? false}
            onLoadMore={() => {
              setFilter('take', Number(filters.take) + DEFAULT_TAKE_PER_PAGE)
            }}
            loading={isLoading ?? isFetching}
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
