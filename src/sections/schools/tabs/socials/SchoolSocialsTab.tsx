import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { useGetSchoolProfileQuery } from "src/redux/services/manager";
import SocialItem from "./SocialItem";
import SocialsForm from "./SocialsForm";

interface Props {
  school_id: string;
}

export default function SchoolSocialsTab({
  school_id,
}: Props): React.ReactElement | null {
  const { data, isLoading } = useGetSchoolProfileQuery(
    { school_id },
    { skip: !school_id }
  );
  const socialLinks = data?.socials;

  if (isLoading) return <CircularProgress />;

  if (!data) return <>No Data</>;

  return (
    <>
      <Box
        sx={{
          backgroundColor: "transparent !important",
          mb: 3,
          height: 420,
          position: "relative",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              {isLoading
? null
: (
                <SocialsForm socialLinks={data.socials} school_id={school_id} />
              )}
              <Typography variant="h6" sx={{ mb: 2 }}>
                Your networks
              </Typography>
              {socialLinks?.map((item: any) => (
                <Stack
                  direction="row"
                  sx={{ wordBreak: "break-all" }}
                  key={item.id}
                >
                  <SocialItem socialItem={item} school_id={school_id} />
                </Stack>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
