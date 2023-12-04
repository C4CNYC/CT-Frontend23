import React from "react";

import { Box, Card, Grid, Skeleton, Stack, Typography } from "@mui/material";

import { useGetSocialsQuery } from "src/redux/services/manager/socials-student";
import { useTranslate } from "src/utils/translateHelper";

import LinkForm from "./LinkForm";
import LinkItem from "./LinkItem";

interface IProfileLinksProps {
  studentId: string;
}

export default function ProfileLinks({
  studentId,
}: IProfileLinksProps): React.ReactElement | null {
  const { data, isLoading } = useGetSocialsQuery({ studentId });
  const translate = useTranslate();

  if (isLoading) return <Skeleton variant="rounded" height="234px" />;

  return (
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
            <LinkForm studentId={studentId} />

            <Typography variant="h6" sx={{ mb: 2 }}>
              {translate("profile_your_networks")}
            </Typography>
            {data?.map((item) => (
              <Stack
                direction="row"
                sx={{ wordBreak: "break-all" }}
                key={item.id}
              >
                <LinkItem socialItem={item} studentId={studentId} />
              </Stack>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
