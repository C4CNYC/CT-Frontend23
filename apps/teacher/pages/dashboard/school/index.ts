import { PATH_DASHBOARD } from "@routes/paths";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index(): React.ReactElement | null {
  const { pathname, push } = useRouter();
  useEffect(() => {
    if (pathname === PATH_DASHBOARD.school.root) {
      push(PATH_DASHBOARD.school.general);
    }
  }, [pathname]);

  return null;
}
