import { Container } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { StudentDashboardLayout } from '@/layouts/dashboard'
import { useGetStudentQuery } from '@/redux/services/manager/students-manager'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import StudentNewEditForm from '@/sections/dashboard/student/StudentNewEditForm'
import SkeletonEditUserForm from '@/sections/dashboard/user/skeleton/SkeletonEditUserForm'
import { CustomBreadcrumbs, useSettingsContext } from '@root/src/components'

UserEditPage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

export default function UserEditPage(): React.ReactElement {
  const {
    query: { id, schoolId },
  } = useRouter()
  const { themeStretch } = useSettingsContext()
  const { data, isLoading } = useGetStudentQuery(
    {
      schoolId: schoolId as string,
      studentId: id as string,
    },
    { skip: !id }
  )

  return (
    <>
      <Head>
        <title> Student: Edit student | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading='Edit student'
          links={[
            {
              name: 'Dashboard',
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
            schoolIdProps={schoolId as string}
          />
        )}
      </Container>
    </>
  )
}
