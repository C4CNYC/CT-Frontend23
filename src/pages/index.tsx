import { PATH_AUTH, PATH_DASHBOARD } from "@routes/paths";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "src/auth/useAuthContext";

export default function HomePage(): React.ReactElement {
  const { isAuthenticated } = useAuthContext();

  const { push } = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      push(PATH_DASHBOARD.root);
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
