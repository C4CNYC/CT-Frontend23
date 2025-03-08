import { Container } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

import DashboardLayout from '@/layouts/dashboard'
import { useGetOrgMemberQuery } from '@/redux/services/admin/members-admin'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import UserNewEditForm from '@/sections/dashboard/user/UserNewEditForm'
import { useTranslate } from '@/utils/translateHelper'
import { CustomBreadcrumbs } from '@root/src/components/custom-breadcrumbs/CustomBreadcrumbs'
import { useSettingsContext } from '@root/src/components/settings/SettingsContext'

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function UserEditPage(): React.ReactElement {
  const {
    query: { id },
  } = useRouter()
  const { themeStretch } = useSettingsContext()
  const translate = useTranslate()

  const { data } = useGetOrgMemberQuery({
    user_id: id as string,
  })

  return (
    <>
      <Head>
        <title> {translate('members_user_edit_user')} </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading=''
          links={[
            {
              name: translate('home'),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            { name: data?.email },
          ]}
        />

        <UserNewEditForm
          isEdit
          currentUser={data}
        />
      </Container>
    </>
  )
}
