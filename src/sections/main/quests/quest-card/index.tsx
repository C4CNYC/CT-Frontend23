import { Skeleton, Stack } from "@mui/material";

import { useGetAssignmentListStudentQuery } from "src/redux/services/student/assignments-student";

import QuestItem from "./QuestItem";

interface IQuestTabProps {
  classId: string;
  activeTab: boolean;
}

export default function QuestsTab({ classId, activeTab }: IQuestTabProps) {
  const { data, isLoading, isFetching } = useGetAssignmentListStudentQuery(
    { class_id: classId },
    { skip: !activeTab, refetchOnMountOrArgChange: true }
  );

  if (!data || isLoading || isFetching) {
    return <Skeleton />;
  }

  return (
    <Stack gap={2}>
      {data.data.map((el) => (
        <QuestItem key={el.id} assignment={el} />
      ))}
    </Stack>
  );
}
