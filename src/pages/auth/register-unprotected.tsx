import Head from "next/head";
import Register from "@sections/auth/Register";

// ----------------------------------------------------------------------

export default function RegisterUnprotectedPage() {
  return (
    <>
      <Head>
        <title> Register Unprotected | Minimal UI</title>
      </Head>

      <Register />
    </>
  );
}
