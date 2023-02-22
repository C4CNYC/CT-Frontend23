import Head from "next/head";
import Login from "@sections/auth/Login";

export default function LoginUnprotectedPage() {
  return (
    <>
      <Head>
        <title> Login Unprotected | Minimal UI</title>
      </Head>

      <Login />
    </>
  );
}
