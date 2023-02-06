// next
import Head from "next/head";
// auth
import GuestGuard from "../auth/GuestGuard";
// sections
import Login from "../sections/auth/Login";
import InviteAuth from "../sections/auth/InviteAuth";
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function InvitePage() {
	return (
		<>
			<Head>
				<title> Invite Login | Codetribe</title>
			</Head>
			<InviteAuth />
		</>
	);
}
