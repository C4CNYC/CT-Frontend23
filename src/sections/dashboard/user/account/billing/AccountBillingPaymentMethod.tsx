import { useState } from "react";
// @mui
import {
  Button,
  Card,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
// components
import Iconify from "@components/iconify";
import Image from "@components/image";
// section
import { IUserAccountBillingCreditCard } from "src/@types/courses";
import { PaymentNewCardDialog } from "../../../../payment";

// ----------------------------------------------------------------------

interface Props {
  cards: IUserAccountBillingCreditCard[];
}

export default function AccountBillingPaymentMethod({
  cards,
}: Props): React.ReactElement | null {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
          <Typography
            variant="overline"
            sx={{
              flexGrow: 1,
              color: "text.secondary",
            }}
          >
            Payment Method
          </Typography>

          <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            New card
          </Button>
        </Stack>

        <Stack
          spacing={2}
          direction={{
            xs: "column",
            md: "row",
          }}
        >
          {cards.map((card) => (
            <Paper
              key={card.id}
              variant="outlined"
              sx={{
                p: 3,
                width: 1,
                position: "relative",
              }}
            >
              <Image
                alt="icon"
                src={
                  card.cardType === "master_card"
                    ? "/assets/icons/payments/ic_mastercard.svg"
                    : "/assets/icons/payments/ic_visa.svg"
                }
                sx={{ mb: 1, maxWidth: 36 }}
              />

              <Typography variant="subtitle2">{card.cardNumber}</Typography>

              <IconButton
                sx={{
                  top: 8,
                  right: 8,
                  position: "absolute",
                }}
              >
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </Paper>
          ))}
        </Stack>
      </Card>

      <PaymentNewCardDialog open={open} onClose={handleClose} />
    </>
  );
}
