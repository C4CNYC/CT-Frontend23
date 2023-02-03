import { useState } from "react";
import Head from "next/head";
import { Card, Container, Box, Tabs, Tab } from "@mui/material";
import DashboardLayout from "../../../layouts/dashboard";
import { useSettingsContext } from "../../../components/settings";
import { ProfileCover } from "../../../sections/@dashboard/user/profile";
// auth
import { useGetOrganizationQuery } from "src/redux/services/admin";
import Iconify from "../../../components/iconify";
import UserProfileTab from "../../../sections/@dashboard/organization/general/tabs/profile";
import CustomizationTab from "../../../sections/@dashboard/organization/general/tabs/customization";
import SettingsTab from "../../../sections/@dashboard/organization/general/tabs/settings";
import {useLocales} from "../../../locales";
import ContactsTab from "../../../sections/@dashboard/organization/general/tabs/contacts";

// components
// ----------------------------------------------------------------------

UserProfilePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  const { translate } = useLocales();
  const TABS = [
    {
      value: 'profile',
      label: translate('organizations.general_page.tabs.labels.profile'),
      icon: <Iconify icon="ic:round-account-box" />,
      component: <UserProfileTab />,
    },
    {
      value: 'settings',
      label: translate('organizations.general_page.tabs.labels.settings'),
      icon: <Iconify icon="ic:baseline-settings-applications" />,
      component: <SettingsTab />,
    },
    {
      value: 'customization',
      label: `${translate('organizations.general_page.tabs.labels.customization')}`,
      icon: <Iconify icon="ic:round-dashboard-customize" />,
      component: <CustomizationTab />,
    },
    {
      value: 'contacts',
      label: 'Contacts',
      icon: <Iconify icon="ic:outline-contacts" />,
      component: <ContactsTab />,
    },
  ];
  const [currentTab, setCurrentTab] = useState('profile');
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetOrganizationQuery();

  return (
    <>
      <Head>
        <title>{`${translate('organizations.title')} : Codetribe`}</title>
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
