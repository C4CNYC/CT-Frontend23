import Login from "@sections/auth/Login";
import Head from "next/head";

export default function LoginUnprotectedPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Login Unprotected | Minimal UI</title>
      </Head>

      <Login />
    </>
  );
}
