// @mui
import { Grid, Stack } from "@mui/material";
// @types
import { IUserProfile, IUserProfilePost } from "../../../../../@types/user";
//
import GeneralContent from "./GeneralContent";

// ----------------------------------------------------------------------

type Props = {
  info: IUserProfile;
};

export default function General({ info }: Props) {
  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={12}>
        <Stack spacing={12}>
          <GeneralContent
            quote={info.quote}
            country={info.country}
            email={info.email}
            role={info.role}
            company={info.company}
            school={info.school}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
