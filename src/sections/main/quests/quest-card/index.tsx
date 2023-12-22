import { Skeleton, Stack } from "@mui/material";

import { EmptyContent, SimpleInfiniteList } from "@components";
import { FilterMode, useFilters } from "@hooks";
import { IAssignmetsSearchParams } from "src/redux/interfaces/assignment.interface";
import { useGetAssignmentListStudentQuery } from "src/redux/services/manager/assignments-student";
import { useTranslate } from "src/utils/translateHelper";

import QuestItem from "./QuestItem";

interface IQuestTabProps {
  classId: string;
  schoolId: string;
  activeTab: boolean;
}

const DEFAULT_TAKE_PER_PAGE = 10;

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

  const translate = useTranslate();

  if (isLoading) {
    return (
      <Stack sx={{ flexDirection: { lg: "row" } }}>
        {getQuestsSkeletonList()}
      </Stack>
    );
  }

  return (
    <Stack sx={{ flexDirection: { lg: "row" } }}>
      <Stack gap={2} flexGrow={1}>
        <SimpleInfiniteList
          hasNextPage={data?.meta.hasNextPage ?? false}
          onLoadMore={() => {
            if (data?.meta.take !== Number(filters?.take)) return;
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
          <EmptyContent title={translate("messages_no_data")} />
        )}
      </Stack>
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
