import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { PATH_AUTH } from "@routes/paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useAuthContext } from "src/auth/useAuthContext";

export default function HomePage(): React.ReactElement {
  const { isAuthenticated } = useAuthContext();
  const { push } = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      push(STUDENT_PATH_DASHBOARD.class.root);
    } else {
      push(PATH_AUTH.singIn);
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
