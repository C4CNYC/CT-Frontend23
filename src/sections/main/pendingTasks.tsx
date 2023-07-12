import { 
  Grid, 
  Link, 
  Paper, 
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

import { EmptyContent } from "@components";

import TaskItem from "./taskItem";
import { SkeletonPendingTask } from "./skeletonsMain";
import { useGetAssignmentListQuery } from "src/redux/services/student/assignments-student";

export default function PendingTasks(): React.ReactElement {
  const { data, isLoading } = useGetAssignmentListQuery();

  return (
    <Paper
      elevation={3}
      sx={{ p: { xs: 2, sm: 5 }, borderRadius: 2, flexGrow: "1" }}
    >
      <Grid
        container
        alignItems="baseline"
        justifyContent="space-between"
        alignContent="center"
      >
        <Typography variant="h5">Pending Tasks</Typography>
        <Link
          href="#"
          underline="none"
          variant="body2"
          sx={{ color: "#02D3D7" }}
        >
          View All Tasks
        </Link>
      </Grid>
      {isLoading ? (
        <Stack pb="7px">
          {Array(1)
            .fill(null)
            .map((e, i) => (
              <SkeletonPendingTask key={i} />
            ))}
        </Stack>
      ) : (
        <Stack spacing={1} sx={{ pt: 5 }}>
          {!data?.data.length ? (
            <EmptyContent title="You don't have any tasks" />
          ) : (
            data?.data.map((assignment) => (
              <Stack key={assignment.id} pb="7px">
                <TaskItem assignment={assignment} />
              </Stack>
            ))
          )}
        </Stack>
      )}
    </Paper>
  );
}
