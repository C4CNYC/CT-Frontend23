import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { useRouter } from "next/router";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function Index(): React.ReactElement | null {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === MANAGER_PATH_DASHBOARD.organization.root) {
      push(MANAGER_PATH_DASHBOARD.organization.general);
    }
  }, [pathname]);

  return null;
}
