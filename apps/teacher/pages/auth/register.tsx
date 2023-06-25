// next
import Register from "@sections/auth/Register";
import Head from "next/head";
import GuestGuard from "src/auth/GuestGuard";

// ----------------------------------------------------------------------

export default function RegisterPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Register | CodeTribe</title>
      </Head>

      <GuestGuard>
        <Register />
      </GuestGuard>
    </>
  );
}
