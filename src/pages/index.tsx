
import { PATH_DASHBOARD, PATH_AUTH } from "@routes/paths";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { Role } from "src/redux/services/enums/role.enum";

export default function HomePage(): React.ReactElement {
  const { isAuthenticated, user } = useAuthContext();

  const { push } = useRouter();
  useEffect(() => {
    if (isAuthenticated && user) {
      push([Role.Owner, Role.Admin].includes(user?.role)
        ? PATH_DASHBOARD.organization.general
        : PATH_DASHBOARD.school.general
      );
    } else {
      push(PATH_AUTH.login)
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
