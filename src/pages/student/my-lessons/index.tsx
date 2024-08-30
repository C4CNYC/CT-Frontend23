import { Container } from '@mui/material'

import { StudentDashboardLayout } from '@/layouts/dashboard'
import LessonsListPage from '@root/src/pages/manager/lessons/list'

export default function MyLessons(): React.ReactElement {
  return (
    <Container maxWidth={false}>
      <LessonsListPage />
    </Container>
  )
}

MyLessons.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)
