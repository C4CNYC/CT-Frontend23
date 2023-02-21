import Head from "next/head";
import { useState } from "react";
import { PATH_DASHBOARD } from "@routes/paths";
import { Container } from "@mui/system";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import CreateCourseDialog from "@sections/dashboard/courses/CreateCourseDialog";
import {
  Button, Box
} from "@mui/material";
import Iconify from "@components/iconify";
import { useSnackbar } from "@components/snackbar";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import { UserCard } from "@sections/dashboard/courses/cards";
import { useSettingsContext } from "@components/settings";

// ----------------------------------------------------------------------

CoursesListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

const _courseCards = [...Array(8)].map((_, index) => ({
  cover: "/assets/assignment/code-idea.svg",
  name: "name",
  level: "123",
  price: "123",
  description: "123",
  active: false
}));

export default function CoursesListPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();


  const createCourse = async (name: string) => {
    console.log("log");
  };


  return (
    <>
      <Head>
        <title> Courses | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Courses"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Courses", href: PATH_DASHBOARD.courses.root }
          ]}
          action={
            <CreateCourseDialog createCourse={createCourse}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add Course
              </Button>
            </CreateCourseDialog>
          }
        />
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)"
          }}
        >
          {_courseCards.map((course, index) => (
            <UserCard key={index} course={course} />
          ))}
        </Box>
      </Container>
    </>
  );
}
