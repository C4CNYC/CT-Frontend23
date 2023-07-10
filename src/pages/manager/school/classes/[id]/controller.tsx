import { TeacherPanel } from "@sections/teacher-panel";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";

ClassSettingPage.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout isFullScreen>{page}</SchoolDashboardLayout>
);

export default function ClassSettingPage(): React.ReactElement {
  return <TeacherPanel />;
}
