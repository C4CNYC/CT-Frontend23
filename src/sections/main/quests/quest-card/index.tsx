import { useRouter } from "next/router";

import { Skeleton, Stack } from "@mui/material";

import { useGetAssignmentListQuery } from "src/redux/services/manager/assignments-manager";

import QuestItem from "./QuestItem";

export default function QuestsTab() {
  const { query } = useRouter();
  const { data, isLoading, isFetching } = useGetAssignmentListQuery(
    {
      schoolId: query.schoolId as string,
    },
    { skip: !query.schoolId, refetchOnMountOrArgChange: true }
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
