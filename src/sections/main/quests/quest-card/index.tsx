import { Skeleton, Stack } from "@mui/material";

import { useGetAssignmentListQuery } from "src/redux/services/manager/assignments-manager";

import QuestItem from "./QuestItem";

interface Props {
  schoolId: string;
}

export default function QuestsTab({ schoolId }: Props) {
  const { data, isLoading } = useGetAssignmentListQuery({ schoolId });
  console.log(data);
  if (!data || isLoading) {
    return <Skeleton />;
  }
  const arr = [
    ...[...data].filter((el) => el?.meta?.pin).reverse(),
    ...[...data].filter((el) => !el?.meta?.pin),
  ];

  return (
    <Stack gap={2}>
      {arr.map((el) => (
        <QuestItem key={el.id} item={el} schoolId={schoolId} />
      ))}
    </Stack>
  );
}
