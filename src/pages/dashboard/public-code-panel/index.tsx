import { LoadingScreen } from "@components";
import { PATH_DASHBOARD } from "@routes/paths";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GuestGuard from "src/auth/GuestGuard";
import { useGetPublicCourseQuery } from "src/redux/services/student/public-student";

export default function Index(): React.ReactElement {
  const { push } = useRouter();

  const { data, isLoading } = useGetPublicCourseQuery({});

  useEffect(() => {
    if (!data) return;
    push(`${PATH_DASHBOARD.publicCodePanel.workSpace(data?.data[0].id)}`);
  }, [data]);
  if (isLoading || !data) return <LoadingScreen />;

  return (
    <GuestGuard>
      <LoadingScreen />
    </GuestGuard>
  );
}
