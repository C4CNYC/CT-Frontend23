import { SchoolDashboardLayout } from "@layouts/dashboard/SchoolDashboardLayout";
import { TeacherPanel } from "@sections/teacher-panel";

// ----------------------------------------------------------------------

ClassSettingPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout isFullScreen>{page}</SchoolDashboardLayout>
);

// ----------------------------------------------------------------------

export default function ClassSettingPage(): React.ReactElement {
  return <TeacherPanel />;
}
