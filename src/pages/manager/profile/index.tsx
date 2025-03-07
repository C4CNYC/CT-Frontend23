import { Container } from '@mui/system'
import Head from 'next/head'

import DashboardLayout from '@/layouts/dashboard'
import { useProfileQuery } from '@/redux/services/auth'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import ProfileEditForm from '@/sections/profile/ProfileEditForm'
import { CustomBreadcrumbs, useSettingsContext } from '@root/src/components'

Profile.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>
export default function Profile() {
  const { data } = useProfileQuery()
  const { themeStretch } = useSettingsContext()
  return (
    <>
      <Head>
        <title>Profile | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading=''
          links={[{ name: 'Home', href: STUDENT_PATH_DASHBOARD.class.root }, { name: data?.email }]}
        />
        <ProfileEditForm currentUser={data} />
      </Container>
    </>
  )
}
