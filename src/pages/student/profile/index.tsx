import Head from "next/head";
import { useState } from "react";

import { 
  Tab, 
  Box, 
  Card, 
  Tabs, 
  Skeleton, 
  Container, 
} from "@mui/material";

import { 
  Iconify, 
  CustomBreadcrumbs, 
  useSettingsContext,
 } from "@components";

import { PATH_MAIN } from "@routes/paths";
import DashboardLayout from "@layouts/dashboard";
import { useProfileQuery } from "src/redux/services/auth";
import ProfileMain from "@sections/student-profile/ProfileMain";
import ProfileCover from "@sections/student-profile/ProfileCover";
import ProfileLinks from "@sections/student-profile/ProfileLinks";
import { ProfileType } from "src/redux/services/enums/profile.enum";

UserProfile.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function UserProfile(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useProfileQuery(ProfileType.STUDENT);
  const [currentTab, setCurrentTab] = useState("profile");
  if (isLoading || !data) return <Skeleton />;
  const TABS = [
    {
      value: "profile",
      label: "Profile",
      icon: <Iconify icon="ic:round-account-box" />,
      component: <ProfileMain data={data} isFriend={false} />,
    },
    {
      value: "links",
      label: "Links",
      icon: <Iconify icon="nimbus:planet" />,
      component: <ProfileLinks studentId={data.id} />,
    },
  ];
  return (
    <>
      <Head>
        <title>Profile | CodeTribe</title>
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
