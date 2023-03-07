import { useSettingsContext } from "@components/settings";
import DashboardLayout from "@layouts/dashboard";
import { Container, Stack } from "@mui/system";
import AppFeatured from "@sections/dashboard/general/app/AppFeatured";
import InfoSectionHome from "@sections/home/info-section-home";
import MainSectionHome from "@sections/home/main-section-home";
import RecentAssignments from "@sections/home/recent-assignments";
import RecentLessons from "@sections/home/recent-lessons";
import WeeklyActivities from "@sections/home/weekly-activities";
import WelcomeSection from "@sections/home/welcome-section";
import { _appFeatured } from "src/_mock/arrays/_app";

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
          <Stack mr="24px">
            <WelcomeSection />
          </Stack>
          <Stack width="344px" height="260px">
            <AppFeatured list={_appFeatured} />
          </Stack>
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
