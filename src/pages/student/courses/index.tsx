import { Container } from '@mui/material'
import Head from 'next/head'

import { CustomBreadcrumbs, useSettingsContext } from '@/components'
import { StudentDashboardLayout } from '@/layouts/dashboard'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import CourseList from '@/sections/courses/CourseList'
import { useTranslate } from '@/utils/translateHelper'

Courses.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

export default function Courses(): React.ReactElement {
  const { themeStretch } = useSettingsContext()

  const translate = useTranslate()

  return (
    <>
      <Head>
        <title> {translate('courses_catalog')+ ` | CodeTribe`}</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading=''
          links={[
            {
              name: translate('sidebar_menu_catalog'),
              href: MANAGER_PATH_DASHBOARD.courses.root,
            },
          ]}
        />
        <CourseList />
      </Container>
    </>
  )
}
