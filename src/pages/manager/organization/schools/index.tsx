import { Container } from '@mui/material'
import Head from 'next/head'

import DashboardLayout from '@/layouts/dashboard'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import AddSchoolDialog from '@/sections/dashboard/schools/portal/AddSchoolDialog'
import SchoolTable from '@/sections/dashboard/schools/view/SchoolTable'
import { useTranslate } from '@/utils/translateHelper'
import { CustomBreadcrumbs } from '@root/src/components/custom-breadcrumbs/CustomBreadcrumbs'
import { useSettingsContext } from '@root/src/components/settings/SettingsContext'

Index.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function Index(): React.ReactElement {
  const translate = useTranslate()

  const { themeStretch } = useSettingsContext()

  return (
    <>
      <Head>
        <title> {translate('organization')} | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={''}
          links={[
            {
              name: translate('home'),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            { name: translate('schools') },
          ]}
          action={<AddSchoolDialog />}
        />
        <SchoolTable />
      </Container>
    </>
  )
}
