import { Grid, Link, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import TaskItem from "./taskItem";

export default function PendingTasks(): React.ReactElement {
  const namesArray = [
    "Introduction to Pyton",
    "Introduction to Pyton 2",
    "Introduction to Pyton 3",
    "Introduction to Pyton 4",
  ];
  return (
    <>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 2, flexGrow: "1" }}>
        <Grid container alignItems="baseline" justifyContent="space-between">
          <Typography variant="h4">Pending Tasks</Typography>
          <Link
            href="#"
            underline="none"
            variant="h5"
            sx={{ color: "#02D3D7" }}
          >
            View All Tasks
          </Link>
        </Grid>
        <Stack spacing={1} sx={{ pt: 5 }}>
          {namesArray.map((item, index) => (
            <TaskItem name={item} key={index} />
          ))}
        </Stack>
      </Paper>
    </>
  );
}
