import Login from "@sections/auth/Login";
import Head from "next/head";
import GuestGuard from "src/auth/GuestGuard";

export default function LoginPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Login | CodeTribe</title>
      </Head>

      <GuestGuard>
        <Login />
      </GuestGuard>
    </>
  );
}
