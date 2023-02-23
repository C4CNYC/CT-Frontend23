import { Grid, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetSchoolProfileQuery } from "src/redux/services/manager";
import ProfileAbout from "./components/ProfileAbout";
import ProfileSocialInfo from "./components/ProfileSocialInfo";
import ProfileUsersInfo from "./components/ProfileUsersInfo";
import SchoolProfileForm from "./form/SchoolProfileForm";

interface Props {
  school_id: string;
}

export default function SchoolProfileTab({
  school_id,
}: Props): React.ReactElement | null {
  const { data, isLoading } = useGetSchoolProfileQuery(
    { school_id },
    { skip: !school_id }
  );

  if (isLoading) return <CircularProgress />;

  if (!data) return <>No Data</>;

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
            <ProfileUsersInfo
              student_count={data?.student_count}
              teacher_count={data?.teacher_count}
            />
            <ProfileAbout data={data} />
            <ProfileSocialInfo socialLinks={data?.socials} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          {isLoading
? null
: (
            <SchoolProfileForm schoolProfile={data} school_id={school_id} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
