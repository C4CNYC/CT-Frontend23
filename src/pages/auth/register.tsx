import Head from "next/head";

import LoginLayout from "@layouts/login/LoginLayout";
import Register from "@sections/auth/Register";
import GuestGuard from "src/auth/GuestGuard";

// ----------------------------------------------------------------------

export default function RegisterPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>Register | CodeTribe</title>
      </Head>

      <GuestGuard>
        <LoginLayout title="Hi, I’m Mumu." subtitle="So glad you’re here!">
          <Register />
        </LoginLayout>
      </GuestGuard>
    </>
  );
}
