import { Stack, Typography } from "@mui/material";
import SubmitPasswordForm from "@sections/auth/SubmitPasswordForm";

import LoginLayout from "@layouts/login/LoginLayout";

export default function SubmitPassword(): React.ReactElement {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ position: "relative" }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Create your password
        </Typography>
        <SubmitPasswordForm />
      </Stack>
    </LoginLayout>
  );
}
