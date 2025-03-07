import { Container } from '@mui/material'
import Head from 'next/head'

import { SchoolDashboardLayout } from '@/layouts/dashboard/SchoolDashboardLayout'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
// sections
import StudentNewEditForm from '@/sections/dashboard/student/StudentNewEditForm'
import { useTranslate } from '@/utils/translateHelper'
import { CustomBreadcrumbs, useSettingsContext } from '@root/src/components'

UserCreatePage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
)

export default function UserCreatePage(): React.ReactElement {
  const { themeStretch } = useSettingsContext()
  const translate = useTranslate()

  return (
    <>
      <Head>
        <title> {translate('students_create_new')} | CodeTribe</title>
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
              name: translate('students'),
              href: MANAGER_PATH_DASHBOARD.school.students,
            },
            { name: translate('students_new_student') },
          ]}
        />
        <StudentNewEditForm />
      </Container>
    </>
  )
}
