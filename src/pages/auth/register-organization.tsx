// next
import RegisterOrganization from "@sections/auth/RegisterOrganizationForm";
import Head from "next/head";
import GuestGuard from "../../auth/GuestGuard";

// ----------------------------------------------------------------------

export default function RegisterPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Register | CodeTribe</title>
      </Head>

      <GuestGuard>
        <RegisterOrganization />
      </GuestGuard>
    </>
  );
}
