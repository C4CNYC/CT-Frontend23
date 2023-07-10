import Head from "next/head";

import GuestGuard from "src/auth/GuestGuard";
import LoginRegister from "@sections/auth/LoginRegister";

export default function RegisterPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Register | CodeTribe</title>
      </Head>

      <GuestGuard>
        <LoginRegister isLogin={false} />
      </GuestGuard>
    </>
  );
}
