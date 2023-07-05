import { useSettingsContext, EmptyContent } from "@components";
import DashboardLayout from "@layouts/dashboard/";
import { Box, Grid, Link, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { PATH_PAGE } from "@routes/paths";
import DefaultClassInfo from "@sections/main/DefaultClassInfo";
import { useGetCourseQuery } from "src/redux/services/student/courses-manager";

import ProjectList from "@sections/main/projectList";
import Head from "next/head";

// ----------------------------------------------------------------------

HomeOverview.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

const GET_COURSES = 2;

export default function HomeOverview(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useGetCourseQuery({ take: GET_COURSES });

  return (
    <>
      <Head>
        <title>Home Overview | Code Tribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"} sx={{ py: 2 }}>
        {!isLoading && !data?.data.length ? (
          <Box
            sx={{
              display: "flex",
              m: "0 auto",
              justifyContent: "center",
              alignItems: "center",
              pt: 8,
            }}
          >
            <EmptyContent
              sx={{
                flexDirection: "row",
                p: 0,
                "& >h5": { maxWidth: "300px", mt: -5 },
              }}
              img="/assets/illustrations/characters/character_3.png"
              title="Sorry you didn't assign to any Class. You can contact with your manager."
            />
          </Box>
        ) : (
          <>
            {!isLoading && <DefaultClassInfo />}
            <Paper
              elevation={3}
              sx={{ my: 4, p: { xs: 2, sm: 5 }, borderRadius: 2 }}
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                mb="40px"
              >
                <Typography variant="h5">Continue Learning</Typography>
                <Link
                  href={PATH_PAGE.courses.root}
                  underline="none"
                  variant="body2"
                  sx={{ color: "#02D3D7" }}
                >
                  View All Courses
                </Link>
              </Grid>

              <ProjectList data={data?.data} isLoading={isLoading} />
            </Paper>
          </>
        )}

        <Grid
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" },
          }}
        >
        </Grid>
      </Container>
    </>
  );
}
