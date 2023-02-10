import React, { useState } from "react";
import { Box, Card, Link, Stack, Typography, Grid, Button } from "@mui/material";
import SocialsForm from "./SocialsForm";
import { useDeleteSchoolSocialMutation, useGetSchoolProfileQuery } from "src/redux/services/manager";
import CircularProgress from "@mui/material/CircularProgress";
import { SOCIAL_ICONS } from "../../../../assets/data";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import SocialItem from "./SocialItem";

type Props = {
  school_id: string;
};

export default function SocialsTab({ school_id }: Props) {
  const { data, isLoading } = useGetSchoolProfileQuery({ school_id }, { skip: !school_id });
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
          position: "relative"
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              {isLoading ? null : <SocialsForm socialLinks={data.socials} school_id={school_id} />}
              <Typography variant="h6" sx={{ mb: 2 }}>Your networks</Typography>
              {socialLinks?.map((item: any) => (
                <Stack direction="row" sx={{ wordBreak: "break-all" }} key={item.id}>
                  <SocialItem
                    socialItem={item}
                    school_id={school_id}
                  />
                </Stack>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
