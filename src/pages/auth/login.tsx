import Head from "next/head";

import LoginRegister from "@sections/auth/LoginRegister";
import GuestGuard from "src/auth/GuestGuard";

export default function LoginPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Login | CodeTribe</title>
      </Head>
      <GuestGuard>
        <LoginRegister isLogin={true} />
      </GuestGuard>
    </>
  );
}
