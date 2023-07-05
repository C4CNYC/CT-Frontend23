import { LoadingScreen } from "@components";
import { PATH_DASHBOARD, PATH_MAIN } from "@routes/paths";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

// ----------------------------------------------------------------------

interface GuestGuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({
  children,
}: GuestGuardProps): React.ReactElement | null {
  const { push, route, asPath } = useRouter();

  const { isAuthenticated, isInitialized } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      if (route.includes("public")) {
        push(asPath);
      } else {
        push(PATH_DASHBOARD.root);
      }
    }
  }, [isAuthenticated]);

  if (isInitialized === isAuthenticated) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
