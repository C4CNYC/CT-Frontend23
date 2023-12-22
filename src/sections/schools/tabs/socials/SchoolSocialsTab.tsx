import React from "react";

import { Box, Card, Grid, Stack, Typography } from "@mui/material";

import { useGetSchoolProfileQuery } from "src/redux/services/manager/schools-manager";
import { useTranslate } from "src/utils/translateHelper";

import SkeletonSocialsTab from "./SkeletonSocialsTab";
import SocialItem from "./SocialItem";
import SocialsForm from "./SocialsForm";

interface Props {
  schoolId: string;
}

export default function SchoolSocialsTab({
  schoolId,
}: Props): React.ReactElement | null {
  const { data, isLoading } = useGetSchoolProfileQuery(
    { schoolId },
    { skip: !schoolId }
  );
  const socialLinks = data?.socials;
  const translate = useTranslate();

  if (isLoading) return <SkeletonSocialsTab />;

  if (!data) return <>{translate("messages_no_data")}</>;

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
              {isLoading ? null : (
                <SocialsForm socialLinks={data.socials} schoolId={schoolId} />
              )}
              <Typography variant="h6" sx={{ mb: 2 }}>
                {translate("networks_tab_your_networks")}
              </Typography>
              {socialLinks?.map((item: any) => (
                <Stack
                  direction="row"
                  sx={{ wordBreak: "break-all" }}
                  key={item.id}
                >
                  <SocialItem socialItem={item} schoolId={schoolId} />
                </Stack>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
