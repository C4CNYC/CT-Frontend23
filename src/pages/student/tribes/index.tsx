import Head from "next/head";
import { useState } from "react";

import { Box, Container, Tab, Tabs } from "@mui/material";

import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard/";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import TribesFillter from "@sections/dashboard/tribes/fillter";
import SkeletonTribes from "@sections/dashboard/tribes/skeletonTribes";
import TribeItem from "@sections/dashboard/tribes/tiribe-card/TribeItem";
import TribesCounter from "@sections/dashboard/tribes/tribesCounter";
import { useGetStudentClassesQuery } from "src/redux/services/manager/classes-student";

enum TabType {
  Active = "active",
  Pending = "pending",
}

Tribes.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function Tribes(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const [currentTab, setCurrentTab] = useState(TabType.Active);

  const { data, isLoading } = useGetStudentClassesQuery({});

  if (isLoading) return <SkeletonTribes />;

  return (
    <>
      <Head>
        <title>Tribes | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            { name: "Tribes", href: STUDENT_PATH_DASHBOARD.tribes.root },
          ]}
        />
        <Container disableGutters>
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "flex-start",
                sm: "space-between",
                md: "space-between",
              },
              alignItems: "baseline",
              flexWrap: {
                xs: "wrap-reverse",
                sm: "wrap-reverse",
                md: "nowrap",
              },
              mt: { xs: "-20px", sm: "20px", md: 0 },
              gap: { xs: 2, sm: 2, md: 0 },
            }}
          >
            <Tabs
              value={currentTab}
              onChange={(event, newValue) => {
                setCurrentTab(newValue);
              }}
            >
              <Tab
                value={TabType.Active}
                label="My Tribes"
                icon={<TribesCounter count={data?.data.length ?? 0} />}
                iconPosition="end"
              />
              <Tab
                value={TabType.Pending}
                label="Pending Tribes"
                icon={<TribesCounter count={0} />}
                iconPosition="end"
              />
            </Tabs>
          </Box>
          <TribesFillter />
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            mt={3}
          >
            {data?.data.map((tribe) => (
              <TribeItem key={tribe.id} tribe={tribe} />
            ))}
          </Box>
        </Container>
      </Container>
    </>
  );
}
