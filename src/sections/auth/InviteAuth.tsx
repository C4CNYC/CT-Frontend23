// next
import NextLink from "next/link";
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from "@mui/material";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
// layouts
import LoginLayout from "../../layouts/login";
import AuthLoginForm from "./AuthLoginForm";
import InviteForm from "./InviteForm";

// ----------------------------------------------------------------------

export default function InviteAuth() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Create your password
        </Typography>
      </Stack>
      <InviteForm />
    </LoginLayout>
  );
}
