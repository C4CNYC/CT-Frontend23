// next
import Head from "next/head";
import GuestGuard from "../../auth/GuestGuard";
import Register from "@sections/auth/Register";

// ----------------------------------------------------------------------

export default function RegisterPage() {
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
