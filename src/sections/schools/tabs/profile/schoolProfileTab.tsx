import {Box, Container, Card, Grid,Typography, Stack, Link} from "@mui/material";
import OrganizationForm from "src/sections/@dashboard/organization/general/tabs/profile/OrganizationForm";
import { useGetOrganizationQuery } from "src/redux/services/admin";
import {useSettingsContext} from "../../../../components/settings";
import { styled } from '@mui/material/styles';
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';

export default function SchoolProfileTab() {
  const { data, isLoading } = useGetOrganizationQuery();
  const { themeStretch } = useSettingsContext();

  return (
    <>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <ProfileFollowInfo following={1000} followers={12000}/>
              <ProfileAbout />
              <ProfileSocialInfo />
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            {isLoading ? null : <OrganizationForm organization={data} />}
          </Grid>

        </Grid>

    </>
  );
}
