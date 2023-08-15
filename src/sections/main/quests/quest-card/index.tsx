import { Skeleton, Stack } from "@mui/material";

import { EmptyContent, SimpleInfiniteList } from "@components";
import { FilterMode, useFilters } from "@hooks";
import Notes from "@sections/main/main-notes/Notes";
import NotesSkeletonList from "@sections/main/main-notes/NotesSkeleton";
import { IAssignmetsSearchParams } from "src/redux/interfaces/assignment.interface";
import { useGetAssignmentListStudentQuery } from "src/redux/services/manager/assignments-student";

import QuestItem from "./QuestItem";

interface IQuestTabProps {
  classId: string;
  schoolId: string;
  activeTab: boolean;
}

const DEFAULT_TAKE_PER_PAGE = 15;

export default function QuestsTab({
  classId,
  schoolId,
  activeTab,
}: IQuestTabProps) {
  const { filters, setFilter } = useFilters<IAssignmetsSearchParams>(
    {},
    FilterMode.local
  );
  const { data, isLoading, isFetching } = useGetAssignmentListStudentQuery(
    { class_id: classId, ...filters },
    { skip: !activeTab || !classId, refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return (
      <Stack sx={{ flexDirection: { lg: "row" } }}>
        {getQuestsSkeletonList()}
        <NotesSkeletonList />
      </Stack>
    );
  }

  return (
    <Stack sx={{ flexDirection: { lg: "row" } }}>
      <Stack gap={2} flexGrow={1}>
        <SimpleInfiniteList
          hasNextPage={data?.meta.hasNextPage ?? false}
          onLoadMore={() => {
            if (data?.meta.take !== filters?.take) return;
            setFilter("take", DEFAULT_TAKE_PER_PAGE);
          }}
          loading={isLoading ?? isFetching}
        >
          {data?.data.map((el) => (
            <QuestItem key={el.id} assignment={el} schoolId={schoolId} />
          ))}

          {isFetching ? getQuestsSkeletonList() : null}
        </SimpleInfiniteList>
        {!isLoading && !isFetching && !data?.data.length && (
          <EmptyContent title="Class did`t have any quests" />
        )}
      </Stack>
      <Notes />
    </Stack>
  );
}

const getQuestsSkeletonList = () => {
  return (
    <Stack gap={2} flexGrow={1}>
      {Array.from("12345").map((el) => (
        <Skeleton variant="rounded" height="124px" key={el + 3} />
      ))}
    </Stack>
  );
};
