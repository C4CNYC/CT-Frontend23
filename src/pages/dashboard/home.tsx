import { useSettingsContext } from "@components/settings";
import SliderDemoMui from "@components/slider/SliderDemoMui";
import DashboardLayout from "@layouts/dashboard";
import { Container, Stack } from "@mui/system";
import InfoSectionHome from "@sections/home/info-section-home";
import MainSectionHome from "@sections/home/main-section-home";
import RecentAssignments from "@sections/home/recent-assignments";
import RecentLessons from "@sections/home/recent-lessons";
import WeeklyActivities from "@sections/home/weekly-activities";
import WelcomeSection from "@sections/home/welcome-section";

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function HomePage(): React.ReactElement | null {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Container
        maxWidth={themeStretch ? false : "lg"}
        sx={{ px: { xs: "5px", sm: "10px" } }}
      >
        <Stack
          display="flex"
          flexDirection="row"
          sx={{
            flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" },
            justifyContent: { xs: "center", sm: "center", md: "auto" },
          }}
        >
          <WelcomeSection />
          <SliderDemoMui />
        </Stack>
        <Stack alignItems="center">
          <MainSectionHome />

          <InfoSectionHome />
          <Stack
            display="flex"
            sx={{
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "column",
                lg: "row",
              },
              alignItems: {
                xs: "center",
                sm: "center",
                md: "center",
                lg: "flex-start",
              },
              justifyContent: "center",
              width: "100%",
              mt: "40px",
              gap: { xs: 3, sm: 3, md: 3, lg: "35px" },
              flexWrap: { xs: "wrap", sm: "wrap", md: "wrap", lg: "nowrap" },
              pt: { xs: 3, ms: 3, md: 3, lg: 0 },
            }}
          >
            <WeeklyActivities />
            <RecentLessons />
            <RecentAssignments />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
