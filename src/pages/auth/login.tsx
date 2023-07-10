import Head from "next/head";

import GuestGuard from "src/auth/GuestGuard";
import LoginRegister from "@sections/auth/LoginRegister";

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
