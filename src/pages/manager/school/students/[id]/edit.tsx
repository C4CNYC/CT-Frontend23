import { Container } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { CustomBreadcrumbs, useSettingsContext } from '@/components'
import { SchoolDashboardLayout } from '@/layouts/dashboard/SchoolDashboardLayout'
import { useGetStudentQuery } from '@/redux/services/manager/students-manager'
import { RootState } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import StudentNewEditForm from '@/sections/dashboard/student/StudentNewEditForm'
import SkeletonEditUserForm from '@/sections/dashboard/user/skeleton/SkeletonEditUserForm'
import { useTranslate } from '@/utils/translateHelper'

UserEditPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
)

export default function UserEditPage(): React.ReactElement {
  const {
    query: { id },
  } = useRouter()
  const { themeStretch } = useSettingsContext()
  const schoolId = useSelector((state: RootState) => state.manager.schoolId)

  const translate = useTranslate()
  const { data, isLoading } = useGetStudentQuery(
    {
      studentId: id as string,
      schoolId,
    },
    { skip: !schoolId || !id }
  )

  return (
    <>
      <Head>
        <title> {translate('students_edit_student')} | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading=''
          links={[
            {
              name: translate('home'),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            { name: data?.account?.email },
          ]}
        />
        {isLoading ? (
          <SkeletonEditUserForm />
        ) : (
          <StudentNewEditForm
            isEdit
            currentUser={data}
          />
        )}
      </Container>
    </>
  )
}
