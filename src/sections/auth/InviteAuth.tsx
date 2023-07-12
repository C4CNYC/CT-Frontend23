import { 
  Stack, 
  Typography,
} from "@mui/material";

import InviteForm from "./InviteForm";
import LoginLayout from "@layouts/login";

export default function InviteAuth(): React.ReactElement {
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
