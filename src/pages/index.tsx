import { useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { PATH_AUTH } from "@routes/paths";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useAuthContext } from "src/auth/useAuthContext";

export default function HomePage(): React.ReactElement {
  const { isAuthenticated } = useAuthContext();
  const { push } = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      void push(STUDENT_PATH_DASHBOARD.class.root);
    } else {
      void push(PATH_AUTH.signIn);
    }
  }, [isAuthenticated, push]);

  return (
    <>
      <Head>
        <title>CodeTribe</title>
      </Head>
    </>
  );
}
