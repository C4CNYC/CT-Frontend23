import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { useRouter } from "next/router";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function Index(): null {
  const { replace } = useRouter();

  useEffect(() => {
    replace(MANAGER_PATH_DASHBOARD.organization.root);
  }, []);

  return null;
}
