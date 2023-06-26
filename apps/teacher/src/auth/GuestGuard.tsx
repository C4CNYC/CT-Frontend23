import { LoadingScreen } from "@ct-nx/components";
import { PATH_DASHBOARD } from "@routes/paths";
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
  const { push } = useRouter();

  const { isAuthenticated, isInitialized } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      push(PATH_DASHBOARD.root);
    }
  }, [isAuthenticated]);

  if (isInitialized === isAuthenticated) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
