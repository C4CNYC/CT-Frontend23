import Head from "next/head";

import InviteAuth from "@sections/auth/InviteAuth";

export default function InvitePage(): React.ReactElement {
  return (
    <>
      <Head>
        <title> Invite Login | Codetribe</title>
      </Head>
      <InviteAuth />
    </>
  );
}
