import { useRouter } from "next/router";
import { useEffect } from "react";

import { LoadingScreen } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useGetStudentClassesQuery } from "src/redux/services/manager/classes-student";

ClassMain.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default function ClassMain(): React.ReactElement {
  const { push } = useRouter();
  const { data: tribes, isLoading } = useGetStudentClassesQuery({});
  useEffect(() => {
    if (isLoading) return;
    if (localStorage.getItem("ON-BOARDING") === "on-boarding") {
      push({
        pathname: STUDENT_PATH_DASHBOARD.class.createClass,
        query: { onBoarding: "on-boarding" },
      });
      localStorage.removeItem("ON-BOARDING");
    } else if (localStorage.getItem("JOIN_TRIBE")) {
      const { joinCode, classId } = JSON.parse(
        localStorage.getItem("JOIN_TRIBE") ?? "{}"
      );
      push(STUDENT_PATH_DASHBOARD.class.id(classId, { joinCode }));
    } else if (tribes?.meta.itemCount && tribes.data.length > 0) {
      push(STUDENT_PATH_DASHBOARD.class.id(tribes.data[0].id));
    } else {
      push(STUDENT_PATH_DASHBOARD.class.join);
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <LoadingScreen />;
}
