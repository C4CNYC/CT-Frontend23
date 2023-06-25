import { LoadingScreen } from "@ct-nx/components";
import { PATH_PAGE } from "@routes/paths";
import { useRouter } from "next/router";
import GuestGuard from "src/auth/GuestGuard";
import { useGetPublicCourseQuery } from "src/redux/services/student/public-student";

export default function Index(): React.ReactElement {
  const router = useRouter();

  const { data, isLoading } = useGetPublicCourseQuery({});

  if (isLoading || !data) return <LoadingScreen />;
  router.push(`${PATH_PAGE.publicCodePanel.workSpace(data?.data[0].id)}`);
  return (
    <GuestGuard>
      <LoadingScreen />
    </GuestGuard>
  );
}
