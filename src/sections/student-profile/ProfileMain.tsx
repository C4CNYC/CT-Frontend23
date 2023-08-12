import { Grid, Skeleton, Stack } from "@mui/material";

import { BaseResponseInterface } from "@utils";
import { IFriend } from "src/redux/interfaces/friends.interface";
import { IStudent } from "src/redux/services/interfaces/user.interface";

import ProfileAbout from "./ProfileAbout";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfileSocialInfo from "./ProfileSocialInfo";

interface IProfileMainProps {
  data?: (IStudent | IFriend) & BaseResponseInterface;
  isFriend?: boolean;
  isLoading: boolean;
}

export default function ProfileMain({
  data,
  isFriend,
  isLoading,
}: IProfileMainProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={isFriend ? 12 : 4}>
        <Stack spacing={3}>
          {!isLoading ? (
            <ProfileAbout data={data} />
          ) : (
            <Skeleton variant="rounded" height="280px" />
          )}

          {!isLoading ? (
            <ProfileSocialInfo studentId={data?.id ?? ""} />
          ) : (
            <Skeleton variant="rounded" sx={{ height: "100px", mt: 2 }} />
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        {!isFriend ? (
          !isLoading && data ? (
            <ProfileInfoForm data={data} />
          ) : (
            <Skeleton
              variant="rounded"
              sx={{ height: { xs: "864px", lg: "680px" } }}
            />
          )
        ) : null}
      </Grid>
    </Grid>
  );
}
