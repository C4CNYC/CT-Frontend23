import { useCallback, useState } from "react";
import Head from "next/head";
import { Card, Container, Box, Grid, Typography, Stack, Tabs, Tab } from "@mui/material";
import { PATH_DASHBOARD } from "../../../routes/paths";
import {
  _userAbout,
  _userFriends,
  _userGallery,
  _userFollowers,
} from "../../../_mock/arrays";
import DashboardLayout from "../../../layouts/dashboard";
import { useSettingsContext } from "../../../components/settings";
import { ProfileCover } from "../../../sections/@dashboard/user/profile";
// auth
import OrganizationForm from "src/sections/@dashboard/organization/OrganizationForm";
import { useGetOrganizationQuery } from "src/redux/services/admin";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import Iconify from "../../../components/iconify";
import UserProfileTab from "../../../sections/@dashboard/organization/general/tabs/profile";
import CustomizationTab from "../../../sections/@dashboard/organization/general/tabs/customization";
import SettingsTab from "../../../sections/@dashboard/organization/general/tabs/settings";

// components
// ----------------------------------------------------------------------

UserProfilePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: <Iconify icon="ic:round-account-box" />,
    component: <UserProfileTab />,
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: <Iconify icon="ic:baseline-settings-applications" />,
    component: <SettingsTab />,
  },
  {
    value: 'customization',
    label: 'Customization',
    icon: <Iconify icon="ic:round-dashboard-customize" />,
    component: <CustomizationTab />,
  },
];

export default function UserProfilePage() {
  const [currentTab, setCurrentTab] = useState('profile');
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
            name={data?.name || ""}
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
              position: 'absolute',
              bgcolor: 'background.paper',
              '& .MuiTabs-flexContainer': {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Card>

        {TABS.map(
          (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
        )}
      </Container>
    </>
  );
}
