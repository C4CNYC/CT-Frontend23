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
        <Stack display="flex" flexDirection="row">
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
          spacing="37px"
        >
          <WeeklyActivities />
          <RecentLessons />
          <RecentAssignments />
        </Stack>
      </Container>
    </>
  );
}
