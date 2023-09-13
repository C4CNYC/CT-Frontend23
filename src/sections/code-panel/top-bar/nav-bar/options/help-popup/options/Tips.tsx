import { useAtom } from "jotai";

import { Alert, Box, Skeleton } from "@mui/material";
import { Stack } from "@mui/system";

import { EmptyContent } from "@components";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import { useGetLessonStudentQuery } from "src/redux/services/manager/lesson-student";

const Tips = (): React.ReactElement => {
  const [{ lessonId }] = useAtom(globalCodePanelAtom);
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
        <Box sx={{ height: "300px" }}>
          <EmptyContent title="No data" />
        </Box>
      )}
    </Stack>
  );
};

export default Tips;
