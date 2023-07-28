import { Container } from "@mui/material";

import { useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import AddQuestModal from "@sections/main/quests/add-quest/AddQuestsModal";

AddQuest.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function AddQuest(): React.ReactElement {
  const { themeStretch } = useSettingsContext();

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <AddQuestModal />
    </Container>
  );
}
