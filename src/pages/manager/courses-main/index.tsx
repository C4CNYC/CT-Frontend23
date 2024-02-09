import { Box, Button } from '@mui/material'
import { Container } from '@mui/system'
import Head from 'next/head'

import { CustomBreadcrumbs, Iconify, SimpleInfiniteList, useSettingsContext } from '@/components'
import { DEFAULT_TAKE_PER_PAGE, FilterMode, useFilters } from '@/hooks'
import DashboardLayout from '@/layouts/dashboard/DashboardLayout'
import { Role } from '@/redux/services/enums/role.enum'
import { ICourseSearchParams } from '@/redux/services/interfaces/courseUnits.interface'
import { useManagerGetCourseQuery } from '@/redux/services/manager/courses-manager'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { CourseCard } from '@/sections/dashboard/courses/cards'
import CreateCourseDialog from '@/sections/dashboard/courses/CreateCourseDialog'
import FilterCourses from '@/sections/dashboard/courses/filter'
import SkeletonCourses from '@/sections/dashboard/courses/skeletonCourses'
import SkeletonList from '@/sections/dashboard/skeleton/skeletonList'
import { getCountTakingElment } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'

CoursesListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function CoursesListPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext()
  const translate = useTranslate()
  const role = localStorage.getItem('role')
  const { filters, setFilter } = useFilters<ICourseSearchParams>(
    {
      name: '',
      school_id: '',
      catalog: Boolean(role === Role.Owner),
    },
    FilterMode.global
  )
  const { data, isLoading, isFetching } = useManagerGetCourseQuery(filters)

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
            <CreateCourseDialog id=''>
              <Button
                variant='contained'
                startIcon={<Iconify icon='eva:plus-fill' />}
              >
                {translate('courses_add')}
              </Button>
            </CreateCourseDialog>
          }
        />
        <FilterCourses
          filters={filters}
          setFilter={setFilter}
        />
        <SimpleInfiniteList
          hasNextPage={data?.meta.hasNextPage ?? false}
          onLoadMore={() => {
            if (data?.meta.take !== Number(filters?.take)) return
            setFilter('take', Number(filters.take) + DEFAULT_TAKE_PER_PAGE)
          }}
          loading={isLoading ?? isFetching}
        >
          <Box
            gap={3}
            display='grid'
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
          >
            {data?.data.map((course, index) => (
              <CourseCard
                key={index}
                course={course}
              />
            ))}
            {isFetching
              ? Array(getCountTakingElment(Number(data.meta.itemCount), Number(filters.take)))
                  .fill(null)
                  .map((v, i) => <SkeletonCourses key={i} />)
              : null}
          </Box>
        </SimpleInfiniteList>
      </Container>
    </>
  )
}
