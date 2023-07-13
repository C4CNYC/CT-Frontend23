import { Grid, Skeleton, Stack } from "@mui/material";

import { IUser } from "src/redux/interfaces/auth.interface";

import ProfileAbout from "./ProfileAbout";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfileSocialInfo from "./ProfileSocialInfo";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import { BaseResponseInterface } from "@utils";

interface Props {
  data?: (IUser | IStudent) & BaseResponseInterface;
  isFriend?: boolean;
}

export default function ProfileMain({ data, isFriend }: Props) {
  if (!data) {
    return <Skeleton />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={isFriend ? 12 : 4}>
        <Stack spacing={3}>
          <ProfileAbout data={data} />

          <ProfileSocialInfo studentId={data.id ?? ""} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        {isFriend ? null : <ProfileInfoForm data={data} />}
      </Grid>
    </Grid>
  );
}
