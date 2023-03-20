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
      <Container maxWidth={themeStretch ? false : "lg"}>
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

        <MainSectionHome />

        <InfoSectionHome />
        <Stack
          ml="40px"
          mt="24px"
          display="flex"
          direction="row"
          mr="24px"
          sx={{
            width: { xs: "auto", sm: "auto", md: "auto", lg: "1100px" },
            ml: { xs: "0", sm: "0", md: "0", lg: "40px" },
            mt: { xs: "0", sm: "0", md: "0", lg: "24px" },
            mr: { xs: "0", sm: "0", md: "0", lg: "40px" },
            gap: { xs: 3, sm: 3, md: 3, lg: "35px" },
            flexWrap: { xs: "wrap", sm: "wrap", md: "wrap", lg: "nowrap" },
            pt: { xs: 3, ms: 3, md: 3, lg: 0 },
          }}
        >
          <WeeklyActivities />
          <RecentLessons />
          <RecentAssignments />
        </Stack>
      </Container>
    </>
  );
}
