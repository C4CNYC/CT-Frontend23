import { PATH_DASHBOARD } from "@routes/paths";
import { useRouter } from "next/router";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function Index(): React.ReactElement {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_DASHBOARD.organization.root) {
      push(PATH_DASHBOARD.organization.general);
    }
  }, [pathname]);

  return null;
}
