import ComingSoon from "@components/coming-soon/ComingSoon";
import { useSettingsContext } from "@components/settings";
import SliderDemoMui from "@components/slider/SliderDemoMui";
import DashboardLayout from "@layouts/dashboard";
import { Grid } from "@mui/material";
import { Container, Stack } from "@mui/system";
import InfoSectionHome from "@sections/home/info-section-home";
import MainSectionHome from "@sections/home/main-section-home";
import RecentAssignments from "@sections/home/recent-assignments";
// import RecentAssignments from "@sections/home/recent-assignments";
import RecentLessons from "@sections/home/recent-lessons";
import WeeklyActivities from "@sections/home/weekly-activities";
import WelcomeSection from "@sections/home/welcome-section";
import Head from "next/head";

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function HomePage(): React.ReactElement | null {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Home | CodeTribe </title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={8}>
            <WelcomeSection />
          </Grid>
          <Grid item xs={12} md={4}>
            <SliderDemoMui list={SLIDER_CONTENT} />
          </Grid>
        </Grid>
        <Stack alignItems="center" gap={3}>
          <MainSectionHome />
          <InfoSectionHome />
          <Stack
            direction="row"
            sx={{
              justifyContent: {
                xs: "center",
                sm: "center",
                md: "center",
                // lg: "space-between",
                lg: "flex-start",
              },
              width: "100%",
              gap: 2,
              flexWrap: { xs: "wrap", sm: "wrap", md: "wrap", lg: "nowrap" },
            }}
          >
            <ComingSoon title="Coming Soon . . .">
              <WeeklyActivities />
            </ComingSoon>
            <ComingSoon title="On the way . . .">
              <RecentLessons />
            </ComingSoon>
            <ComingSoon title="Coming Soon . . .">
              <RecentAssignments />
            </ComingSoon>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
const SLIDER_CONTENT = [
  {
    id: "1",
    image: "/BG.png",
    title: "Suggest a new lesson or course",
    description:
      "Ask us to create a new lesson. Add your suggestion to Google Form",
  },
  {
    id: "2",
    image: "/BG.png",
    title: "Suggest a new lesson or course",
    description:
      "Ask us to create a new lesson. Add your suggestion to Google Form",
  },
  {
    id: "3",
    image: "/BG.png",
    title: "Suggest a new lesson or course",
    description:
      "Ask us to create a new lesson. Add your suggestion to Google Form",
  },
  {
    id: "4",
    image: "/BG.png",
    title: "Suggest a new lesson or course",
    description:
      "Ask us to create a new lesson. Add your suggestion to Google Form",
  },
];
