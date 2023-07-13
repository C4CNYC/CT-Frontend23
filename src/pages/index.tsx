import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { PATH_AUTH } from "@routes/paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useAuthContext } from "src/auth/useAuthContext";
import { Role } from "src/redux/services/enums/role.enum";

export default function HomePage(): React.ReactElement {
  const { isAuthenticated, user } = useAuthContext();
  const { push } = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      push(
        user?.role === Role.Student
          ? STUDENT_PATH_DASHBOARD.class.root
          : MANAGER_PATH_DASHBOARD.organization.general
      );
    } else {
      push(PATH_AUTH.login);
    }
  }, [isAuthenticated]);

  return (
    <>
      <Head>
        <title>CodeTribe</title>
      </Head>
    </>
  );
}
