// @mui
import { Alert, Box, Button, Stack, Tooltip, Typography } from "@mui/material";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
// layouts
import LoginLayout from "../../layouts/login";

// ----------------------------------------------------------------------

export default function LoginAuth0(): React.ReactElement {
  const { method } = useAuthContext();

  // NOTE: Turn off comments below to enable Auth0.
  // const { login } = useAuthContext();

  const handleLoginAuth0 = (): void => {
    try {
      // NOTE: Turn off comments below to enable Auth0.
      // await login();
    } catch (error: any) {}
  };

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Sign in to Minimal</Typography>

        <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: "absolute", right: 0 }}
          />
        </Tooltip>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :
        <strong> demo1234</strong>
      </Alert>

      <Button
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        onClick={handleLoginAuth0}
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Login
      </Button>
    </LoginLayout>
  );
}
