// @mui
import { Button, Link, Stack, Typography } from "@mui/material";
// utils
import { fCurrency } from "../../../../../utils/formatNumber";
import { fDate } from "../../../../../utils/formatTime";
// components
import Iconify from "@components/iconify";
import { IUserAccountBillingInvoice } from "src/@types/courses";

// ----------------------------------------------------------------------

interface Props {
  invoices: IUserAccountBillingInvoice[];
}

export default function AccountBillingInvoiceHistory({
  invoices,
}: Props): React.ReactElement | null {
  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="overline" sx={{ width: 1, color: "text.secondary" }}>
        Invoice History
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {invoices.map((invoice) => (
          <Stack
            key={invoice.id}
            direction="row"
            justifyContent="space-between"
            sx={{ width: 1 }}
          >
            <Typography variant="body2" sx={{ minWidth: 120 }}>
              {fDate(invoice.createdAt)}
            </Typography>

            <Typography variant="body2">{fCurrency(invoice.price)}</Typography>

            <Link>PDF</Link>
          </Stack>
        ))}
      </Stack>

      <Button
        size="small"
        color="inherit"
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
      >
        All invoices
      </Button>
    </Stack>
  );
}
