import { useState } from "react";
import Head from "next/head";
import { Card, Container, Box, Tabs, Tab } from "@mui/material";
import { useSettingsContext } from "../../../components/settings";
import { ProfileCover } from "../../../sections/@dashboard/user/profile";
import { useGetOrganizationQuery } from "src/redux/services/admin";
import Iconify from "../../../components/iconify";
import SchoolProfileTab from "../../../sections/schools/tabs/profile/schoolProfileTab";
import CustomizationTab from "../../../sections/@dashboard/organization/general/tabs/customization/customization";
import SettingsTab from "../../../sections/@dashboard/organization/general/tabs/settings/settings";
import SchoolDashboardLayout from "src/layouts/dashboard/SchoolDashboardLayout";

// components
// ----------------------------------------------------------------------

UserProfilePage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

const TABS = [
  {
    value: "profile",
    label: "General1",
    icon: <Iconify icon="ic:round-account-box" />,
    component: <SchoolProfileTab />,
  },
  {
    value: "settings",
    label: "Settings",
    icon: <Iconify icon="ic:baseline-settings-applications" />,
    component: <SettingsTab />,
  },
  {
    value: "customization",
    label: "Customization",
    icon: <Iconify icon="ic:round-dashboard-customize" />,
    component: <CustomizationTab />,
  },
];

export default function UserProfilePage() {
  const [currentTab, setCurrentTab] = useState("profile");
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetOrganizationQuery();

  return (
    <>
      <Head>
        <title> Organizations: Codetribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <ProfileCover
            name={data?.title || ""}
            role={data?.email || ""}
            cover={"/assets/icons/shool/organization.svg"}
          />
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: "absolute",
              bgcolor: "background.paper",
              "& .MuiTabs-flexContainer": {
                pr: { md: 3 },
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

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value}> {tab.component} </Box>
            )
        )}
      </Container>
    </>
  );
}
