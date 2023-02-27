import FooterHome from "@components/footer-home";
import InfoSectionHome from "@sections/home/info-section-home";
import MainSectionHome from "@sections/home/main-section-home";
import RecentAssignments from "@sections/home/recent-assignments ";
import RecentLessons from "@sections/home/recent-lessons";
import SliderDemoMui from "@components/slider/SliderDemoMui";
import WeeklyActivities from "@sections/home/weekly-activities";
import WelcomeSection from "@sections/home/welcome-section";
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
