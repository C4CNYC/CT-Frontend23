import { useRouter } from "next/router";
import { useEffect } from "react";

import { LoadingScreen } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import GuestGuard from "src/auth/GuestGuard";
import { useGetPublicCourseQuery } from "src/redux/services/public-student";

export default function Index(): React.ReactElement {
  const { push } = useRouter();

  const { data, isLoading } = useGetPublicCourseQuery({});

  useEffect(() => {
    if (!data) return;
    push(
      `${STUDENT_PATH_DASHBOARD.publicCodePanel.workSpace(data?.data[0].id)}`
    );
  }, [data]);
  if (isLoading || !data) return <LoadingScreen />;

  return (
    <GuestGuard>
      <LoadingScreen />
    </GuestGuard>
  );
}
