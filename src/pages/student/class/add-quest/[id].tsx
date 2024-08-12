import { Container } from '@mui/material'

import { useSettingsContext } from '@/components'
import { StudentDashboardLayout } from '@/layouts/dashboard'
import AddQuest from '@/sections/main/quests/add-quest'
import QuestPageTour from '@root/src/sections/intro-tours/teacher-intro-quest'

AddQuestPage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
)

export default function AddQuestPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext()

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <QuestPageTour />
      <AddQuest />
    </Container>
  )
}
