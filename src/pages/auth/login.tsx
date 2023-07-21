import Head from "next/head";

import LoginLayout from "@layouts/login/LoginLayout";
import Login from "@sections/auth/Login";
import GuestGuard from "src/auth/GuestGuard";

export default function LoginPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>Login | CodeTribe</title>
      </Head>
      <GuestGuard>
        <LoginLayout title="Hi, I’m Mumu." subtitle="So glad you’re here!">
          <Login />
        </LoginLayout>
      </GuestGuard>
    </>
  );
}
