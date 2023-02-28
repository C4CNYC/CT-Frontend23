import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import Iconify from "@components/iconify";
import { useSettingsContext } from "@components/settings";
import { Box, Button, Container } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import CreateTaskDialog from "@sections/dashboard/tasks/CreateTaskDialog";
import TaskCard from "@sections/dashboard/tasks/TaskCard";
import Head from "next/head";
import DashboardLayout from "src/layouts/dashboard";
import FilterTasks from "./filter";

// ----------------------------------------------------------------------

TasksListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function TasksListPage(): React.ReactElement {
  const taskInfo = {
    name: "Name",
    description: "Some Descr",
    id: "121341",
    type: "type",
    active: false,
    key: 14124214,
  };

  const { themeStretch } = useSettingsContext();
  // const { data, isLoading } = useGetLessonsQuery();

  // if (isLoading) return <CircularProgress />;
  // if (data?.data.length === 0) return <SearchNotFound />;
  return (
    <>
      <Head>
        <title>Tasks | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Tasks List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Tasks", href: PATH_DASHBOARD.lessons.root },
            { name: "List" },
          ]}
          action={
            <CreateTaskDialog isEdit={false}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Create Task
              </Button>
            </CreateTaskDialog>
          }
        />
        <FilterTasks />
        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
          }}
        >
          <TaskCard task={taskInfo} />
        </Box>
      </Container>
    </>
  );
}
