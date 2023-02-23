// @mui
import { Grid, Stack } from "@mui/material";
import { IUserProfile } from "src/@types/courses";
//
import GeneralContent from "./GeneralContent";

// ----------------------------------------------------------------------

interface Props {
  info: IUserProfile;
}

export default function General({ info }: Props): React.ReactElement | null {
  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={12}>
        <Stack spacing={12}>
          <GeneralContent />
        </Stack>
      </Grid>
    </Grid>
  );
}
