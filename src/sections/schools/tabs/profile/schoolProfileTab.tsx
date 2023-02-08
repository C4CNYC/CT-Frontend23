import {Box, Container, Card, Grid, Typography, Stack, Link, TextFieldProps} from "@mui/material";
import SchoolProfileForm from "./form/SchoolProfileForm";
import { useGetSchoolProfileQuery } from "src/redux/services/manager";
import {useSettingsContext} from "../../../../components/settings";
import { styled } from '@mui/material/styles';
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';

type Props =  {
  school_id: string;
};

export default function SchoolProfileTab({school_id} :Props) {

  const { data, isLoading } = useGetSchoolProfileQuery({school_id}, {skip: !school_id});

  if (isLoading) return 'Loading';

  if (!data) return 'No data';

  return (
    <>
        <Grid
          container
          alignItems="start"
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <ProfileFollowInfo />
              <ProfileAbout data={data}/>
              <ProfileSocialInfo />
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            {isLoading ? null : <SchoolProfileForm schoolProfile={data} />}
          </Grid>

        </Grid>

    </>
  );
}
