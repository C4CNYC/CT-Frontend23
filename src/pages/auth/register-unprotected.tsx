import Head from "next/head";

import Register from "@sections/auth/Register";

// ----------------------------------------------------------------------

export default function RegisterUnprotectedPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Register Unprotected </title>
      </Head>

      <Register />
    </>
  );
}
