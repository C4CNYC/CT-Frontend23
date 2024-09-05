import { Container } from '@mui/material'

import { StudentDashboardLayout } from '@/layouts/dashboard'
import ModulesListPage from '@root/src/pages/manager/modules/list'

export default function MyModules(): React.ReactElement {
  return (
    <Container maxWidth={false}>
      <ModulesListPage />
    </Container>
  )
}

MyModules.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)
