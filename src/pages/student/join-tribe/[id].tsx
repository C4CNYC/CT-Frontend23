import { useRouter } from "next/router";

import { LoadingScreen } from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import JoinTribeModal from "@sections/join-tribe/JoinTribeModal";
import GuestGuard from "src/auth/GuestGuard";
import { useGetPublicTribeQuery } from "src/redux/services/public/tribe-public";
import { useSelector } from "src/redux/store";

export default function JoinTribe(): React.ReactElement {
  const user = useSelector((state) => state.global.user);
  const { query } = useRouter();
  const { data, isLoading } = useGetPublicTribeQuery(
    {
      joinCode: query.id as string,
    },
    { skip: !query.id }
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return (
      <StudentDashboardLayout>
        <JoinTribeModal classInfo={data} isSingIn={true} />
      </StudentDashboardLayout>
    );
  }

  return (
    <GuestGuard>
      <JoinTribeModal classInfo={data} />
    </GuestGuard>
  );
}
