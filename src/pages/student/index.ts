import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useRouter } from "next/router";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function Index(): null {
  const { replace } = useRouter();

  useEffect(() => {
    replace(STUDENT_PATH_DASHBOARD.tribes.root);
  }, []);

  return null;
}
