import Head from "next/head";

import { 
  Box, 
  Button, 
  Container,
  CircularProgress, 
} from "@mui/material";

import { 
  Iconify,
  CustomBreadcrumbs, 
  useSettingsContext, 
} from "@components";

import FilterTasks from "./filter";

import { 
  useFilters,
  FilterMode, 
} from "@hooks";
import DashboardLayout from "src/layouts/dashboard";
import TaskCard from "@sections/dashboard/tasks/TaskCard";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import CreateCodeDialog from "@sections/dashboard/tasks/CodeDialog";
import SkeletonList from "@sections/dashboard/skeleton/skeletonList";
import { useGetTasksQuery } from "src/redux/services/manager/tasks-manager";
import { ITaskSearchParams } from "src/redux/services/interfaces/task.interface";

TasksListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function TasksListPage(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { filters, setFilter } = useFilters<ITaskSearchParams>(
    {
      name: "",
    },
    FilterMode.global
  );

  const { data, isLoading, isFetching } = useGetTasksQuery(filters);

  if (isLoading) return <SkeletonList />;

  return (
    <>
      <Head>
        <title>Tasks | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Tasks List"
          links={[
            { name: "Dashboard", href: MANAGER_PATH_DASHBOARD.root },
            { name: "Tasks", href: MANAGER_PATH_DASHBOARD.lessons.root },
            { name: "List" },
          ]}
          action={
            <CreateCodeDialog>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Create Task
              </Button>
            </CreateCodeDialog>
          }
        />
        <FilterTasks filters={filters} setFilter={setFilter} />
        {isFetching ? (
          <CircularProgress />
        ) : (
          <Box
            gap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
          >
            {data?.data.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}
