import { type FC } from "react";

import { Alert, Box, Skeleton } from "@mui/material";
import { Stack } from "@mui/system";

import { EmptyContent } from "@components";

import { useGetLessonStudentQuery } from "src/redux/services/manager/lesson-student";
import { useSelector } from "src/redux/store";

const Tips: FC = () => {
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId);
  const { data, isLoading } = useGetLessonStudentQuery({ id: lessonId });

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <Skeleton variant="rounded" width="100%" height="50px" />
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      {data?.tips.length ? (
        data?.tips?.map((t, i) => (
          <Alert key={i} severity="info">
            {t}
          </Alert>
        ))
      ) : (
        <Box sx={BOX_SX}>
          <EmptyContent title="No data" />
        </Box>
      )}
    </Stack>
  );
};

const BOX_SX = { height: "300px" };

export default Tips;
