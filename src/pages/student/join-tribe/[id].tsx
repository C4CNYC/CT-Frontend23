import { useRouter } from "next/router";
import { useEffect } from "react";

import { LoadingScreen } from "@components";
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

  useEffect(() => {
    if (query.id && data) {
      localStorage.setItem(
        "JOIN_TRIBE",
        JSON.stringify({ joinCode: query.id, classId: data.id })
      );
    }
  }, [query.id, data]);

  if (isLoading || !data) {
    return <LoadingScreen />;
  }

  if (user) {
    <JoinTribeModal classInfo={data} isSignIn={true} />;
  }

  return (
    <GuestGuard>
      <JoinTribeModal classInfo={data} />
    </GuestGuard>
  );
}
