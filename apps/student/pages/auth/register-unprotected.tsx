import Register from "@sections/auth/Register";
import Head from "next/head";

// ----------------------------------------------------------------------

export default function RegisterUnprotectedPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Register Unprotected | Minimal UI</title>
      </Head>

      <Register />
    </>
  );
}
