// @mui
import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import {
  IUserAccountBillingAddress,
  IUserAccountBillingCreditCard,
  IUserAccountBillingInvoice,
} from "src/@types/courses";
import AccountBillingAddressBook from "./AccountBillingAddressBook";
import AccountBillingInvoiceHistory from "./AccountBillingInvoiceHistory";
import AccountBillingPaymentMethod from "./AccountBillingPaymentMethod";

// ----------------------------------------------------------------------

interface Props {
  cards: IUserAccountBillingCreditCard[];
  invoices: IUserAccountBillingInvoice[];
  addressBook: IUserAccountBillingAddress[];
}

export default function AccountBilling({
  cards,
  addressBook,
  invoices,
}: Props): React.ReactElement | null {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Typography
              variant="overline"
              sx={{ mb: 3, display: "block", color: "text.secondary" }}
            >
              Your Plan
            </Typography>
            <Typography variant="h4">Premium</Typography>
            <Box
              sx={{
                mt: { xs: 2, sm: 0 },
                position: { sm: "absolute" },
                top: { sm: 24 },
                right: { sm: 24 },
              }}
            >
              <Button
                size="small"
                color="inherit"
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Cancel plan
              </Button>
              <Button size="small" variant="outlined">
                Upgrade plan
              </Button>
            </Box>
          </Card>

          <AccountBillingPaymentMethod cards={cards} />

          <AccountBillingAddressBook addressBook={addressBook} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
}
