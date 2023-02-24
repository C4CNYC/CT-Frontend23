// next
import Register from "@sections/auth/Register";
import Head from "next/head";
import GuestGuard from "../../auth/GuestGuard";

// ----------------------------------------------------------------------

export default function RegisterPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Register | Minimal UI</title>
      </Head>

      <GuestGuard>
        <Register />
      </GuestGuard>
    </>
  );
}
