import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { PATH_AUTH } from "@routes/paths";
import { useAuthContext } from "src/auth/useAuthContext";
import { Role } from "src/redux/services/enums/role.enum";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";

export default function HomePage(): React.ReactElement {
  const { isAuthenticated, user } = useAuthContext();

  const { push } = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      push(
        user?.role === Role.Student
          ? STUDENT_PATH_DASHBOARD.tribes.root
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
