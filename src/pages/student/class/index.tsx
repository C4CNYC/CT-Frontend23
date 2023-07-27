import { useRouter } from "next/router";

import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useGetClassesQuery } from "src/redux/services/student/classes-manager";

ClassMain.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function ClassMain(): React.ReactElement {
  const { push } = useRouter();
  const { data: tribes } = useGetClassesQuery({});
  if (tribes && tribes.data.length) {
    push(STUDENT_PATH_DASHBOARD.class.id(tribes.data[0].id));
  } else {
    push(STUDENT_PATH_DASHBOARD.class.join);
  }
  return <></>;
}
