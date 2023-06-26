// @mui
import { Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";

// layouts
import { PATH_AUTH } from "@routes/paths";
import LoginLayout from "../../layouts/login";
import AuthLoginForm from "./AuthLoginForm";

// ----------------------------------------------------------------------

export default function Login(): React.ReactElement {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Sign in as a Student
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ justifyContent: "center" }}>
          <Typography variant="body2">New user?</Typography>
          <Link
            component={NextLink}
            href={PATH_AUTH.register}
            variant="subtitle2"
            sx={{ color: "#02D3D7" }}
          >
            Create an account
          </Link>
        </Stack>
      </Stack>
      <AuthLoginForm />
    </LoginLayout>
  );
}
