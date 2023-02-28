import SearchNotFound from "@components/search-not-found/SearchNotFound";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { CircularProgress, Grid, Link, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Head from "next/head";
import { useGetLessonsQuery } from "src/redux/services/manager";
import PendingTasks from "./components/pendingTasks";
import ProjectList from "./components/projectList";
import SummatyList from "./components/summatyList";
import TriberList from "./components/triberList";

// ----------------------------------------------------------------------

HomeOverview.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function HomeOverview(): React.ReactElement {
  const { data, isLoading } = useGetLessonsQuery();

  if (isLoading) return <CircularProgress />;
  if (data?.data.length === 0) return <SearchNotFound />;

  return (
    <>
      <Head>
        <title>Home Overview | Code Tribe</title>
      </Head>
      <Container maxWidth={false} sx={{ py: 2 }}>
        <Typography variant="h2" gutterBottom>
          Welcome back, Cartola!
        </Typography>
        <SummatyList />
        <Paper elevation={3} sx={{ my: 3, p: 5, borderRadius: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h3" sx={{ mb: 5 }}>
              Continue Learning
            </Typography>
            <Link
              href="#"
              underline="none"
              variant="h6"
              sx={{ color: "#02D3D7" }}
            >
              View All Projects
            </Link>
          </Grid>
          <ProjectList />
        </Paper>
        <Grid
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" },
          }}
        >
          <PendingTasks />
          <TriberList />
        </Grid>
      </Container>
    </>
  );
}
