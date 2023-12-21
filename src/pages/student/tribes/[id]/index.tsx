import Head from "next/head";
import { useRouter } from "next/router";

import { format } from "date-fns";

import {
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { Iconify, useSettingsContext } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import SkeletonTribe from "@sections/skeleton/SekeltonTribe";
import ProfileCover from "@sections/student-profile/ProfileCover";
import { fNumber } from "@utils";
import { useGetClassQuery } from "src/redux/services/manager/classes-student";

TribeProfilePage.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function TribeProfilePage(): React.ReactElement {
  const { query } = useRouter();
  const { themeStretch } = useSettingsContext();

  const { data, isLoading } = useGetClassQuery(
    { id: query.id as string },
    { skip: !query.id }
  );

  if (isLoading) return <SkeletonTribe />;

  return (
    <>
      <Head>
        <title>Tribe {`${data?.name}`} | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <ProfileCover
            name={data?.name ?? ""}
            avatar={data?.avatar ?? ""}
            cover={data?.cover ?? ""}
          />
        </Card>
        <Grid
          container
          alignItems="start"
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ py: 3 }}>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <Stack width={1} textAlign="center">
                    <Typography variant="h4">
                      {fNumber(data?.students?.length ?? 0)}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Students
                    </Typography>
                  </Stack>

                  <Stack width={1} textAlign="center">
                    <Typography variant="h4">{fNumber(0)}</Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Courses
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
              <Card>
                <CardHeader title="About" />
                <Stack spacing={2} sx={{ p: 3 }}>
                  <Typography variant="body2">{data?.description}</Typography>
                  <Stack direction="row">
                    <Iconify icon="eva:pin-fill" />
                    <Typography ml={1} variant="body2">
                      {data?.school?.city}, {data?.school?.country}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Iconify icon="ant-design:calendar-outlined" />
                    <Typography ml={1} variant="body2">
                      {format(new Date(data?.createdAt ?? 0), "MM/dd/yyyy")}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}></Grid>
        </Grid>
      </Container>
    </>
  );
}
