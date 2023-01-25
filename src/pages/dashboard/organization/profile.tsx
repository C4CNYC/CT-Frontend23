import {useCallback, useState} from "react";
import Head from "next/head";
import { Card, Container, Box, Grid, Typography, Stack } from "@mui/material";
import { PATH_DASHBOARD } from "../../../routes/paths";
import {
  _userAbout,
  _userFriends,
  _userGallery,
  _userFollowers,
} from "../../../_mock/arrays";
import DashboardLayout from "../../../layouts/dashboard";
import { useSettingsContext } from "../../../components/settings";
import {ProfileCover} from "../../../sections/@dashboard/user/profile";
// auth
import OrganizationForm from "src/sections/@dashboard/organization/OrganizationForm";
import { useGetOrganizationQuery } from 'src/redux/services/admin/admin';
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
// components
// ----------------------------------------------------------------------

UserProfilePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------


export default function UserProfilePage() {
  const { themeStretch } = useSettingsContext();
  const organizationId = useSelector((state: RootState) => state.global.organizationId)
  const { data, isLoading } = useGetOrganizationQuery({ id: organizationId })

  console.log({data});

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
            name={data?.name || ''}
            role={data?.email || ''}
            cover={""}
          />
        </Card>
          
        {
          isLoading ? null : (
            <OrganizationForm organization={data}/>
          )
        }  
      </Container>
    </>
  );
}
