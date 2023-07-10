import { useEffect } from "react";
import { useRouter } from "next/router";

import { LoadingScreen } from "@components";
import { useAuthContext } from "./useAuthContext";
import { Role } from "src/redux/services/enums/role.enum";
import { MANAGER_PATH_AFTER_LOGIN, STUDENT_PATH_AFTER_LOGIN } from "src/config-global";

// ----------------------------------------------------------------------

interface GuestGuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({
  children,
}: GuestGuardProps): React.ReactElement | null {
  const { push, route, asPath } = useRouter();

  const { isAuthenticated, isInitialized, user } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      if (route.includes("public")) {
        push(asPath);
      } else {
        push(
          user?.role === Role.Student
            ? STUDENT_PATH_AFTER_LOGIN
            : MANAGER_PATH_AFTER_LOGIN
        );
      }
    }
  }, [isAuthenticated]);

  if (isInitialized === isAuthenticated) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
