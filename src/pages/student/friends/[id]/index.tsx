import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

import { Box, Card, Container, Skeleton, Tab, Tabs } from "@mui/material";

import { useSettingsContext, Iconify, CustomBreadcrumbs } from "@components";

import { PATH_MAIN } from "@routes/paths";
import DashboardLayout from "@layouts/dashboard";
import ProfileCover from "@sections/student-profile/ProfileCover";
import { useGetFriendQuery } from "src/redux/services/student/friends-manager";

FriendProfile.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function FriendProfile(): React.ReactElement {
  const { query } = useRouter();
  const [currentTab, setCurrentTab] = useState("profile");

  const { themeStretch } = useSettingsContext();

  const { data, isLoading } = useGetFriendQuery({ id: query.id as string });

  if (isLoading || !data) return <Skeleton />;
  // const TABS = [
    // {
    //   value: "profile",
    //   label: "Profile",
    //   icon: <Iconify icon="ic:round-account-box" />,
    //   component: <ProfileMain data={data} isFriend={true} />,
    // },
  // ];
  return (
    <>
      <Head>
        <title>Friend profile | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[
            { name: "Dashboard", href: PATH_MAIN.index },
            { name: `Profile ${data?.email}` },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <ProfileCover
            name={`${data?.first_name} ${data?.last_name}` ?? ""}
            avatar={data?.avatar ?? ""}
            cover={data?.cover ?? ""}
          />

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
            {/* {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.label}
              />
            ))} */}
          </Tabs>
        </Card>

        {/* {TABS.map((tab) => {
          return (
            tab.value === currentTab && (
              <Box key={tab.value}> {tab.component} </Box>
            )
          );
        })} */}
      </Container>
    </>
  );
}
