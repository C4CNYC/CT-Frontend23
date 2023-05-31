import { useSettingsContext } from "@components/settings";
import SliderDemoMui from "@components/slider/SliderDemoMui";
import DashboardLayout from "@layouts/dashboard";
import { Container, Stack } from "@mui/system";
import InfoSectionHome from "@sections/home/info-section-home";
import MainSectionHome from "@sections/home/main-section-home";
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
        <Stack
          display="flex"
          flexDirection="row"
          sx={{
            flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" },
            justifyContent: "center",
            gap: 3,
            mb: 3,
          }}
        >
          <WelcomeSection />
          <SliderDemoMui />
        </Stack>
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
            <WeeklyActivities />
            <RecentLessons />
            {/* <RecentAssignments /> */}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
