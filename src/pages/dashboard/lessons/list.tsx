import { useState } from "react";
import Head from "next/head";
import {
  Button,
  Box,
  Container
} from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import Iconify from "@components/iconify";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import { useSettingsContext } from "@components/settings";
import { useSnackbar } from "notistack";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { useGetLessonsQuery } from "src/redux/services/manager";
import ModuleCard from "@sections/dashboard/modules/ModuleCard";
import CreateLessonDialog from "@sections/dashboard/lessons/CreateLessonDialog";
import LessonCard from "@sections/dashboard/lessons/LessonCard";

// ----------------------------------------------------------------------

LessonsListPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function LessonsListPage() {
  const [openConfirm, setOpenConfirm] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetLessonsQuery();

  if (isLoading) return "loading";
  if (data.data.length === 0) return "no data";

  return (
    <>
      <Head>
        <title> Classes | CodeTribe</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Lessons List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Lessons", href: PATH_DASHBOARD.lessons.root },
            { name: "List" }
          ]}
          action={
            <CreateLessonDialog>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Create Lesson
              </Button>
            </CreateLessonDialog>
          }
        />

        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)"
          }}
        >
          {data?.data.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              // selected={selected.includes("folder.id")}
              onSelect={() => console.log("qwe")}
              onDelete={() => console.log("qwe")}
            />
          ))}

        </Box>
      </Container>
    </>
  );
}
