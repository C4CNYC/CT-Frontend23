import { useRouter } from "next/router";

import { Skeleton, Stack } from "@mui/material";

import { useGetAssignmentListQuery } from "src/redux/services/manager/assignments-manager";

import QuestItem from "./QuestItem";

export default function QuestsTab() {
  const { query } = useRouter();
  const { data, isLoading } = useGetAssignmentListQuery({
    schoolId: query.schoolId as string,
  });

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
