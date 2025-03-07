import { Container } from '@mui/material'
import { Stack } from '@mui/system'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { useFilters } from '@/hooks'
import { SchoolDashboardLayout } from '@/layouts/dashboard/SchoolDashboardLayout'
import {
  useGetProgressContentQuery,
  useGetProgressQuery,
} from '@/redux/services/manager/progress-manager'
import { useGetStudentsQuery } from '@/redux/services/manager/students-manager'
import { RootState } from '@/redux/store'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import FilterClassesAutocomplete from '@/sections/dashboard/progress/filters/Classes'
import FilterCoursesAutocomplete from '@/sections/dashboard/progress/filters/Courses'
import ProgressTable from '@/sections/dashboard/progress/progressTable/ProgressTable'
import {
  SkeletonProgressTable,
  SkeletonProgressTableRow,
} from '@/sections/dashboard/progress/progressTable/SkeletonProgressTable'
import { getCountTakingElment } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'
import { CustomBreadcrumbs } from '@root/src/components'

Progress.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
)

export interface IProgressTableData {
  y: string
  x: Array<{
    id: string
    name: string
    type: string
    progress: number
  }>
}

export enum ProgressLevel {
  module = 'Module',
  lesson = 'Lesson',
  chalanges = 'Chalanges',
}

export default function Progress(): React.ReactElement {
  const { query } = useRouter()
  const schoolId = useSelector((state: RootState) => state.manager.schoolId)
  const { filters, setFilter } = useFilters({
    courseId: '',
    classId: '',
    moduleId: '',
    lessonId: '',
  })

  const translate = useTranslate()

  const { data: students, isLoading } = useGetStudentsQuery(
    {
      schoolId,
      class_id: filters.classId,
    },
    { skip: !filters.classId }
  )
  const { data: content, isLoading: isLoadingContent } = useGetProgressContentQuery({
    id: query.courseId as string,
  })
  const { data: progress } = useGetProgressQuery({
    id: query.courseId as string,
  })

  return (
    <>
      <Head>
        <title>{translate('progress')} | CodeTribe </title>
      </Head>
      <Container sx={{ ml: 0 }}>
        <CustomBreadcrumbs
          heading=''
          links={[
            {
              name: translate('home'),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            {
              name: translate('progress'),
              href: MANAGER_PATH_DASHBOARD.school.progress,
            },
          ]}
        />
        <Stack
          direction='row'
          mb={3}
          sx={{
            flexWrap: { xs: 'wrap', sm: 'wrap' },
            gap: 3,
            '& .MuiStack-root, & .MuiAutocomplete-root': {
              width: {
                xs: '100% !important',
                sm: '260px !important',
                md: '260px !important',
                lg: '260px !important',
              },
            },
          }}
        >
          <FilterCoursesAutocomplete
            courseId={filters.courseId ?? query.courseId}
            setCourse={(courseId: string) => {
              setFilter('courseId', courseId)
            }}
          />
          <FilterClassesAutocomplete
            classId={filters.classId ?? query.classId}
            setClass={(classId: string) => {
              setFilter('classId', classId)
            }}
          />
        </Stack>
        {isLoading ? (
          <SkeletonProgressTable />
        ) : (
          <>
            {/* This page will be implemented later */}
            <ProgressTable
              filters={filters}
              setFilter={setFilter}
              data={[]}
              viewBy={{
                main: 'course',
                user: 'name',
              }}
              levelName={'course'}
            />
            {isLoadingContent
              ? Array(getCountTakingElment(Number(students?.meta.itemCount), Number(filters.take)))
                  .fill(null)
                  .map((v, i) => <SkeletonProgressTableRow key={i} />)
              : null}
          </>
        )}
      </Container>
    </>
  )
}
