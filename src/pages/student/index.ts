import { useRouter } from "next/router";
import { useEffect } from "react";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";

// ----------------------------------------------------------------------

export default function Index(): null {
  const { replace } = useRouter();

  useEffect(() => {
    replace(STUDENT_PATH_DASHBOARD.class.root);
  }, []);

  return null;
}
