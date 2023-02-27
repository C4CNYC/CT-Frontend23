import FooterHome from "@components/footer-home";
import InfoSectionHome from "@components/info-section-home";
import MainSectionHome from "@components/main-section-home";
import RecentAssignments from "@components/recent-assignments ";
import RecentLessons from "@components/recent-lessons";
import SliderDemoMui from "@components/slider/SliderDemoMui";
import WeeklyActivities from "@components/weekly-activities";
import WelcomeSection from "@components/welcome-section";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import Stack from "@mui/material/Stack";

export default function Home() {
  return (
    <>
      <DashboardLayout>
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
        <FooterHome />
      
      </DashboardLayout>
    </>
  );
}
