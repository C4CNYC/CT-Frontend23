import { CustomBreadcrumbs, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard/";

import { Box, Container, Link, Tab, Tabs } from "@mui/material";
import { PATH_DASHBOARD, PATH_PAGE } from "@routes/paths";
import TribesFillter from "@sections/dashboard/tribes/fillter";
import SkeletonTribes from "@sections/dashboard/tribes/skeletonTribes";
import TribeItem from "@sections/dashboard/tribes/tiribe-card/TribeItem";
import Head from "next/head";
import { useState } from "react";
import { useGetClassesQuery } from "src/redux/services/student/classes-manager";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import TribesCounter from "@sections/dashboard/tribes/tribesCounter";
import NextLink from "next/link";

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

  const { data, isLoading } = useGetClassesQuery({});

  if (isLoading) return <SkeletonTribes />;

  return (
    <>
      <Head>
        <title>Tribes | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Tribes"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Tribes", href: PATH_DASHBOARD.tribes.root },
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
            sx={{
              pt: { xs: "20px", sm: "35px", md: "45px" },
              m: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: {
                xs: "center",
                sm: "flex-start",
              },
              gap: { xs: 4, sm: 3, md: 3 },
            }}
          >
            {data?.data.map((tribe) => (
              <Link
                component={NextLink}
                key={tribe.id}
                href={STUDENT_PATH_DASHBOARD.tribes.tribe(tribe.id)}
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
              >
                <TribeItem tribe={tribe} />
              </Link>
            ))}
          </Box>
        </Container>
      </Container>
    </>
  );
}
