import Iconify from "@components/iconify";
import { useSettingsContext } from "@components/settings";
import UploadImageModal from "@components/upload-image-modal";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Box, Card, Container, Stack, Tab, Tabs } from "@mui/material";
import { ProfileCover } from "@sections/dashboard/user/profile";
import {
  SchoolContactsTab,
  SchoolProfileTab,
  SchoolSettingsTab,
  SchoolSocialsTab,
} from "@sections/schools/tabs";
import SkeletonProfileTab from "@sections/schools/tabs/profile/SkeletomProfileTab";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { MdContacts } from "react-icons/md";
import { useSelector } from "react-redux";
import { useUpdateSchoolCoverMutation } from "src/redux/services/admin";
import { useGetSchoolProfileQuery } from "src/redux/services/manager/schools-manager";
import { RootState } from "../../../../redux/store";
import SkeletonSchool from "./skeleton-school";

UserProfilePage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export default function UserProfilePage(): React.ReactElement {
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const [currentTab, setCurrentTab] = useState("profile");
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetSchoolProfileQuery(
    { schoolId },
    { skip: !schoolId }
  );

  const TABS = [
    {
      value: "profile",
      label: "General",
      icon: <Iconify icon="ic:round-account-box" />,
      component: <SchoolProfileTab schoolId={schoolId} />,
    },
    {
      value: "settings",
      label: "Settings",
      icon: <Iconify icon="ic:baseline-settings-applications" />,
      component: <SchoolSettingsTab schoolId={schoolId} />,
    },
    {
      value: "contacts",
      label: "Contacts",
      icon: <MdContacts />,
      component: <SchoolContactsTab schoolId={schoolId} />,
    },
    {
      value: "socials",
      label: "Social Networks",
      icon: <BsPeopleFill />,
      component: <SchoolSocialsTab schoolId={schoolId} />,
    },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const [updateSchoolCoverImage] = useUpdateSchoolCoverMutation();

  const onUpload = async (data: File): Promise<void> => {
    try {
      const file = new FormData();
      file.append("file", data);
      await updateSchoolCoverImage({ file }).unwrap();
      enqueueSnackbar("Image updated");
    } catch (error) {
      enqueueSnackbar("Image not updated", { variant: "error" });
    }
  };
  if (isLoading) {
    return (
      <>
        <SkeletonSchool />
        <Container maxWidth={themeStretch ? false : "lg"}>
          <SkeletonProfileTab />
        </Container>
      </>
    );
  }

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
          <Stack
            sx={{ position: "absolute", zIndex: 10, mt: "10px", ml: "93%" }}
          >
            <UploadImageModal onUpload={onUpload} id={schoolId} />
          </Stack>
          <ProfileCover
            name={data?.name ?? ""}
            avatar={data?.avatar}
            cover={data?.cover ?? "/assets/icons/shool/organization.svg"}
          />
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => {
              setCurrentTab(newValue);
            }}
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
