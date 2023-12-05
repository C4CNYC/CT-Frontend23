import Head from "next/head";
import { useState } from "react";

import { Box, Card, Container, Skeleton, Tab, Tabs } from "@mui/material";

import { CustomBreadcrumbs, Iconify, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import ProfileCover from "@sections/student-profile/ProfileCover";
import ProfileLinks from "@sections/student-profile/ProfileLinks";
import ProfileMain from "@sections/student-profile/ProfileMain";
import { useProfileQuery } from "src/redux/services/auth";
import { useTranslate } from "src/utils/translateHelper";

UserProfile.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function UserProfile(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useProfileQuery();
  const [currentTab, setCurrentTab] = useState("profile");
  const translate = useTranslate();

  const TABS = [
    {
      value: "profile",
      label: "profile",
      icon: <Iconify icon="ic:round-account-box" />,
      component: (
        <ProfileMain data={data} isFriend={false} isLoading={isLoading} />
      ),
    },
    {
      value: "links",
      label: "profile_links",
      icon: <Iconify icon="nimbus:planet" />,
      component: <ProfileLinks studentId={data?.id ?? ""} />,
    },
  ];

  return (
    <>
      <Head>
        <title>{translate("profile")} | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading=""
          links={[
            {
              name: translate("home"),
              href: STUDENT_PATH_DASHBOARD.class.root,
            },
            { name: translate("profile") },
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
              name={data?.first_name ?? ""}
              lastName={data?.last_name ?? ""}
              avatar={data?.avatar}
              cover={data?.student_profile.cover}
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
                label={translate(tab.label)}
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
