import { CircularProgress, Container } from "@mui/material";

import { useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import AddQuest from "@sections/main/quests/add-quest";
import { useGetAssignmentQuery } from "src/redux/services/manager/assignments-manager";
import { useRouter } from "next/router";

AddQuestPage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function AddQuestPage(): React.ReactElement {
  const { query } = useRouter();
  const { themeStretch } = useSettingsContext();

  const { data: assignment, isLoading } = useGetAssignmentQuery(
    {
      schoolId: query.schoolId as string,
      assignmentId: query.assignmentId as string,
    },
    { skip: !query.assignmentId && !query.scholId }
  );

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <AddQuest assignment={assignment}/>
    </Container>
  );
}
