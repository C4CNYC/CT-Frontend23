import { PATH_DASHBOARD } from "@routes/paths";
import { useRouter } from "next/router";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function ClassSettingPage(): React.ReactElement | null {
  const router = useRouter();
  useEffect(() => {
    router.replace(`${PATH_DASHBOARD.stream}/some_id`)
  }, [])
  return null;
}
