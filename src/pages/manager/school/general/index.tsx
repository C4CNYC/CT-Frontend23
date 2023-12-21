import Head from "next/head";
import { useState } from "react";

import { useSnackbar } from "notistack";
import { BsPeopleFill } from "react-icons/bs";
import { MdContacts } from "react-icons/md";
import { useSelector } from "react-redux";

import { Box, Card, Container, Stack, Tab, Tabs } from "@mui/material";

import { Iconify, UploadImageModal, useSettingsContext } from "@components";
import { SchoolDashboardLayout } from "@layouts/dashboard/SchoolDashboardLayout";
import { ProfileCover } from "@sections/dashboard/user/profile";
import {
  SchoolContactsTab,
  SchoolProfileTab,
  SchoolSettingsTab,
  SchoolSocialsTab,
} from "@sections/schools/tabs";
import SkeletonProfileTab from "@sections/schools/tabs/profile/SkeletomProfileTab";
import {
  useGetSchoolProfileQuery,
  useUpdateSchoolCoverImgMutation,
} from "src/redux/services/manager/schools-manager";
import { RootState } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

import SkeletonSchool from "./skeleton-school";

UserProfilePage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export default function UserProfilePage(): React.ReactElement {
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const translate = useTranslate();
  const [currentTab, setCurrentTab] = useState("profile");
  const { themeStretch } = useSettingsContext();
  const { data, isLoading, isFetching } = useGetSchoolProfileQuery(
    { schoolId },
    { skip: !schoolId }
  );
  const TABS = [
    {
      value: "profile",
      label: "general",
      icon: <Iconify icon="ic:round-account-box" />,
      component: <SchoolProfileTab schoolId={schoolId} />,
    },
    {
      value: "settings",
      label: "settings",
      icon: <Iconify icon="ic:baseline-settings-applications" />,
      component: <SchoolSettingsTab schoolId={schoolId} />,
    },
    {
      value: "contacts",
      label: "contacts",
      icon: <MdContacts />,
      component: <SchoolContactsTab schoolId={schoolId} />,
    },
    {
      value: "socials",
      label: "social_networks",
      icon: <BsPeopleFill />,
      component: <SchoolSocialsTab schoolId={schoolId} />,
    },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const [updateSchoolCoverImage] = useUpdateSchoolCoverImgMutation();

  const onUpload = async (
    data: File,
    id: string | undefined
  ): Promise<void> => {
    try {
      const file = new FormData();
      file.append("file", data);
      if (!id) {
        return;
      } else {
        await updateSchoolCoverImage({ id, file }).unwrap();
      }
      enqueueSnackbar(translate("messages_img_updated"));
    } catch (error: any) {
      enqueueSnackbar(translate("messages_img_not_updated"), {
        variant: "error",
      });
    }
  };

  if (isLoading || isFetching) {
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
        <title> {translate("organization")} | CodeTribe </title>
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
            sx={{
              position: "absolute",
              right: 0,
              zIndex: 10,
              mt: "10px",
              mr: "10px",
            }}
          >
            <UploadImageModal onUpload={onUpload} id={schoolId} />
          </Stack>
          <ProfileCover
            name={data?.name ?? ""}
            avatar={data?.avatar}
            cover={data?.cover}
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
                label={translate(tab.label)}
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
