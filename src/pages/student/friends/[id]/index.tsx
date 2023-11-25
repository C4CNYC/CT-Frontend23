import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import { Box, Card, Container, Skeleton, Tab, Tabs } from "@mui/material";

import { CustomBreadcrumbs, Iconify, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import ProfileCover from "@sections/student-profile/ProfileCover";
import ProfileMain from "@sections/student-profile/ProfileMain";
import { useGetFriendQuery } from "src/redux/services/manager/friends-manager";

FriendProfile.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function FriendProfile(): React.ReactElement {
  const { query } = useRouter();
  const [currentTab, setCurrentTab] = useState("profile");

  const { themeStretch } = useSettingsContext();

  const { data, isLoading } = useGetFriendQuery({ id: query.id as string });

  const TABS = [
    {
      value: "profile",
      label: "Profile",
      icon: <Iconify icon="ic:round-account-box" />,
      component: (
        <ProfileMain data={data} isFriend={true} isLoading={isLoading} />
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Friend profile | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            { name: "Home", href: STUDENT_PATH_DASHBOARD.class.root },
            { name: "Profile" },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          {!isLoading ? (
            <ProfileCover
              name={`${data?.first_name} ${data?.last_name}`}
              avatar={data?.avatar}
              cover={data?.cover}
            />
          ) : (
            <Skeleton variant="rounded" height="280px" />
          )}

          <Tabs
            value={currentTab}
            onChange={(event, newValue: string) => {
              setCurrentTab(newValue);
            }}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: "absolute",
              bgcolor: "background.paper",
              "& .MuiTabs-flexContainer": {
                pr: { xs: 0, md: 3 },
                pl: { xs: 2, md: 0 },
                justifyContent: {
                  sm: "center",
                  md: "flex-end",
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </Tabs>
        </Card>

        {TABS.map((tab) => {
          return (
            tab.value === currentTab && (
              <Box key={tab.value}> {tab.component} </Box>
            )
          );
        })}
      </Container>
    </>
  );
}
