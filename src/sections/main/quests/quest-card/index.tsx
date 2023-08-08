import { Skeleton, Stack } from "@mui/material";

import { useGetAssignmentListQuery } from "src/redux/services/manager/assignments-manager";

import QuestItem from "./QuestItem";

interface IQuestsTab {
  schoolId: string;
}

export default function QuestsTab({ schoolId }: IQuestsTab) {
  const { data, isLoading } = useGetAssignmentListQuery(
    { schoolId },
    { skip: !schoolId }
  );

  if (!data || isLoading) {
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
