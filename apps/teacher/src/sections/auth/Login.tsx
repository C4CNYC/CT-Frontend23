// next
import NextLink from "next/link";
// @mui
import { Link, Stack, Typography } from "@mui/material";
// layouts
import LoginLayout from "@layouts/login";
// routes
import { PATH_AUTH } from "@routes/paths";
//
import AuthLoginForm from "./AuthLoginForm";
import TipButton from "./TipButton";

// ----------------------------------------------------------------------

const TIP = `TIP: If your school has already signed up. 
Please ask for a “Teacher” Join-Link from one of the School Admins.`;

export default function Login(): React.ReactElement {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Sign in as a Teacher
        </Typography>
        <Typography variant="body2" sx={{ m: "16px auto 0px!important" }}>
          New user?
          <Link
            component={NextLink}
            href={PATH_AUTH.registerOrganization}
            variant="subtitle2"
            sx={{ color: "#02D3D7", ml: 1 }}
          >
            Join to organization
          </Link>
        </Typography>

        <TipButton tip={TIP} />
      </Stack>
      <AuthLoginForm />

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
