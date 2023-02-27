// @mui
import { Stack, TextField, Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function PaymentBillingAddress(): React.ReactElement {
  return (
    <div>
      <Typography variant="h6">Billing Address</Typography>

      <Stack spacing={3} mt={5}>
        <TextField fullWidth label="Person name" />
        <TextField fullWidth label="Phone number" />
        <TextField fullWidth label="Email" />
        <TextField fullWidth label="Address" />
      </Stack>
    </div>
  );
}
