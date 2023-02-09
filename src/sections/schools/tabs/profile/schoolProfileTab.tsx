import { Grid, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SchoolProfileForm from "./form/SchoolProfileForm";
import ProfileAbout from './components/ProfileAbout';
import ProfileFollowInfo from './components/ProfileFollowInfo';
import ProfileSocialInfo from './components/ProfileSocialInfo';
import { useGetSchoolProfileQuery } from "src/redux/services/manager";

type Props =  {
  school_id: string;
};

export default function SchoolProfileTab({school_id} :Props) {

  const { data, isLoading } = useGetSchoolProfileQuery({school_id}, {skip: !school_id});

  if (isLoading) return <CircularProgress />;

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
            {isLoading ? null : <SchoolProfileForm schoolProfile={data} school_id={school_id}/>}
          </Grid>

        </Grid>

    </>
  );
}
