import { Skeleton, Stack } from "@mui/material";

import { useGetAssignmentListStudentQuery } from "src/redux/services/student/assignments-student";

import QuestItem from "./QuestItem";

interface IQuestTabProps {
  classId: string;
}

export default function QuestsTab({ classId }: IQuestTabProps) {
  const { data, isLoading, isFetching } = useGetAssignmentListStudentQuery(
    { class_id: classId },
    { refetchOnMountOrArgChange: true }
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
