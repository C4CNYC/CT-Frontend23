import { useRouter } from "next/router";

import { Card, Divider, Skeleton, Stack, Typography } from "@mui/material";

import { useGetAssignmentListStudentQuery } from "src/redux/services/manager/assignments-student";
import { useGetClassStudentsQuery } from "src/redux/services/manager/classes-student";
import { useTranslate } from "src/utils/translateHelper";

interface IGeneralInfo {
  activeTab: boolean;
}

export default function GeneralInfo({ activeTab }: IGeneralInfo) {
  const { query } = useRouter();
  const translate = useTranslate();
  const { data, isLoading } = useGetClassStudentsQuery(
    { id: query.id as string },
    { skip: !query.id || !activeTab }
  );
  const { data: quests, isLoading: questsLoading } =
    useGetAssignmentListStudentQuery(
      { class_id: query.id as string },
      { skip: !query.id || !activeTab }
    );

  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          {isLoading ? (
            <Skeleton
              variant="rounded"
              sx={{ height: "36px", width: "40px", m: "0 auto" }}
            />
          ) : (
            <Typography variant="h4">{data?.data.length ?? 0}</Typography>
          )}

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {translate("student")}
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          {questsLoading ? (
            <Skeleton
              variant="rounded"
              sx={{ height: "36px", width: "40px", m: "0 auto" }}
            />
          ) : (
            <Typography variant="h4">{quests?.data.length}</Typography>
          )}

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {translate("quests")}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
