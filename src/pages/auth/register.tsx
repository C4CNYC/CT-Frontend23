import Head from "next/head";

import LoginRegister from "@sections/auth/LoginRegister";
import GuestGuard from "src/auth/GuestGuard";

// ----------------------------------------------------------------------

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
