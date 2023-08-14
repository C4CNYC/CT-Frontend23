import { useRouter } from "next/router";

import { LoadingScreen } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useGetClassesQuery } from "src/redux/services/student/classes-manager";

ClassMain.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function ClassMain(): React.ReactElement {
  const { push } = useRouter();
  const { data: tribes, isLoading } = useGetClassesQuery({});
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (localStorage.getItem("JOIN_TRIBE")) {
    const { joinCode, classId } = JSON.parse(
      localStorage.getItem("JOIN_TRIBE") ?? "{}"
    );
    push(STUDENT_PATH_DASHBOARD.class.id(classId, { joinCode }));
  } else if (tribes?.data.length) {
    push(STUDENT_PATH_DASHBOARD.class.id(tribes.data[0].id));
  } else {
    push(STUDENT_PATH_DASHBOARD.class.join);
  }

  return <></>;
}
