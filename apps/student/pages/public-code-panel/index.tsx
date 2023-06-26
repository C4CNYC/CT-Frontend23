import { LoadingScreen } from "@ct-nx/components";
import { PATH_PAGE } from "@routes/paths";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GuestGuard from "src/auth/GuestGuard";
import { useGetPublicCourseQuery } from "src/redux/services/student/public-student";

export default function Index(): React.ReactElement {
  const { push } = useRouter();

  const { data, isLoading } = useGetPublicCourseQuery({});

  useEffect(() => {
    if (!data) return;
    push(`${PATH_PAGE.publicCodePanel.workSpace(data?.data[0].id)}`);
  }, [data]);
  if (isLoading || !data) return <LoadingScreen />;

  return (
    <GuestGuard>
      <LoadingScreen />
    </GuestGuard>
  );
}
