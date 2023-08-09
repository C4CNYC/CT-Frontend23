import { Skeleton, Stack } from "@mui/material";

import { useGetAssignmentListQuery } from "src/redux/services/manager/assignments-manager";

import QuestItem from "./QuestItem";

interface IQuestTabProps {
  schoolId: string;
}

export default function QuestsTab({ schoolId }: IQuestTabProps) {
  const { data, isLoading, isFetching } = useGetAssignmentListQuery(
    {
      schoolId: schoolId,
    },
    { refetchOnMountOrArgChange: true }
  );

  if (!data || isLoading || isFetching) {
    return <Skeleton />;
  }

  const arr = [
    ...data.filter((el) => el?.meta?.pin).reverse(),
    ...data.filter((el) => !el?.meta?.pin),
  ];

  return (
    <Stack gap={2}>
      {arr.map((el) => (
        <QuestItem key={el.id} assignment={el} />
      ))}
    </Stack>
  );
}
