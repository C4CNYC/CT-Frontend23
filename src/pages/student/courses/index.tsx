import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import { Box, Container, Skeleton, Tab, Tabs } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import CourseList from "@sections/courses/CourseList";
// import LessonList from "@sections/courses/LessonList";
// import ModuleList from "@sections/courses/ModuleList";
import TribesCounter from "@sections/dashboard/tribes/tribesCounter";

Courses.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps): React.ReactElement {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Courses(): React.ReactElement {
  const router = useRouter();
  const { themeStretch } = useSettingsContext();
  const [counter, setCounter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.replace("/student/courses", undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title> Courses Catalog | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <>
          <CustomBreadcrumbs
            heading=""
            links={[
              { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
              { name: "Courses", href: MANAGER_PATH_DASHBOARD.courses.root },
            ]}
          />
        </>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          allowScrollButtonsMobile={false}
          sx={{ mt: -2 }}
        >
          {/* <Tab
            label="Courses"
            {...a11yProps(0)}
            icon={
              value === 0 ? (
                !isLoading ? (
                  <TribesCounter
                    sx={{ background: "rgba(0, 184, 217, 0.16)" }}
                    sxText={{ color: "rgb(0, 108, 156)" }}
                    count={counter}
                  />
                ) : (
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    sx={{ width: "24px", height: "22px", ml: 1 }}
                  />
                )
              ) : (
                <Box sx={{ width: "24px", height: "22px", ml: 1 }} />
              )
            }
            iconPosition="end"
          /> */}
          {/* <Tab
            label="Modules"
            {...a11yProps(1)}
            icon={
              value === 1 ? (
                !isLoading ? (
                  <TribesCounter
                    sx={{ background: "rgba(54, 179, 126, 0.16)" }}
                    sxText={{ color: "rgb(27, 128, 106)" }}
                    count={counter}
                  />
                ) : (
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    sx={{ width: "24px", height: "22px", ml: 1 }}
                  />
                )
              ) : (
                <Box sx={{ width: "24px", height: "22px", ml: 1 }} />
              )
            }
            iconPosition="end"
          />
          <Tab
            label="Lessons"
            {...a11yProps(2)}
            icon={
              value === 2 ? (
                !isLoading ? (
                  <TribesCounter
                    sx={{ background: "rgba(255, 171, 0, 0.16)" }}
                    sxText={{ color: "rgb(183, 110, 0)" }}
                    count={counter}
                  />
                ) : (
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    sx={{ width: "24px", height: "22px", ml: 1 }}
                  />
                )
              ) : (
                <Box sx={{ width: "24px", height: "22px", ml: 1 }} />
              )
            }
            iconPosition="end"
          /> */}
        </Tabs>

        <TabPanel value={value} index={0}>
          <CourseList setCounter={setCounter} setIsLoading={setIsLoading} />
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
          <ModuleList setCounter={setCounter} setIsLoading={setIsLoading} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <LessonList setCounter={setCounter} setIsLoading={setIsLoading} />
        </TabPanel> */}
      </Container>
    </>
  );
}
