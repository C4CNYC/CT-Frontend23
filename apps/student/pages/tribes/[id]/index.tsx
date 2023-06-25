import { CustomAvatar, Image, Iconify, useSettingsContext } from "@ct-nx/components";
import DashboardLayout from "@layouts/dashboard";
import {
  Box,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { format } from "date-fns";

import Head from "next/head";
import { useRouter } from "next/router";
import { useGetClassQuery } from "src/redux/services/student/classes-manager";
import { bgBlur, fNumber } from "@ct-nx/utils";

const StyledRoot = styled("div")(({ theme }) => ({
  "&:before": {
    ...bgBlur({
      color: theme.palette.primary.light,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));

const StyledInfo = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  // marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

TribeProfilePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function TribeProfilePage(): React.ReactElement {
  const { query } = useRouter();
  const { themeStretch } = useSettingsContext();

  const { data, isLoading } = useGetClassQuery({ id: query.id as string }, { skip: !query.id });

  if (isLoading) return <CircularProgress/>

  return (
    <>
      <Head>
        <title>Organizations | CodeTribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <Stack
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 10,
            }}
          >
               <StyledRoot>
      <StyledInfo>
        <CustomAvatar
          src={data?.avatar}
          alt={data?.name}
          name={data?.name}
          sx={{
            mx: "auto",
            borderWidth: 2,
            objectFit: "contain",
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />

        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h4">{data?.name}</Typography>
        </Box>
      </StyledInfo>
      <Image
        alt="cover"
        src={data?.cover}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
        }}
      />
    </StyledRoot>
          </Stack>
        </Card>
        <>
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
                      <Typography variant="h4">{fNumber(data?.students?.length ?? 0)}</Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Students
                      </Typography>
                    </Stack>

                    <Stack width={1} textAlign="center">
                      <Typography variant="h4">{fNumber(data?.courses?.length ?? 0)}</Typography>

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
        </>
      </Container>
    </>
  );
}
