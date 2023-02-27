// next
import NextLink from "next/link";
// @mui
import { Link, Stack, Typography } from "@mui/material";
// layouts
import LoginLayout from "../../layouts/login";
// routes
import { PATH_AUTH } from "../../routes/paths";
//
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import IconButton from "@mui/material/IconButton";
import AuthLoginForm from "./AuthLoginForm";
import AuthWithSocial from "./AuthWithSocial";

// ----------------------------------------------------------------------

export default function Login(): React.ReactElement {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Sign in as a Teacher
        </Typography>

        <Stack direction="row" spacing={0.5} sx={{ justifyContent: "center" }}>
          <Typography variant="body2">New user?</Typography>
          <IconButton
            aria-label="info"
            sx={{
              position: "absolute",
              right: "-40px",
              top: "10px",
              padding: "10px",
              backgroundColor: "#FBDD3F",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            <EmojiObjectsIcon sx={{ color: "#000" }} />
          </IconButton>
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

      <AuthWithSocial />
    </LoginLayout>
  );
}
