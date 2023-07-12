import { useState } from "react";

import Carousel from "react-slick";

// @mui
import {
  Box,
  IconButton,
  MenuItem,
  Stack,
  SxProps,
  Typography,
  alpha,
} from "@mui/material";
import { Theme, styled, useTheme } from "@mui/material/styles";

// components
import { CarouselDots, Iconify, Image, MenuPopover } from "@components";
// utils
import { bgGradient, fCurrency } from "@utils";

// ----------------------------------------------------------------------

const HEIGHT = 276;

const StyledRoot = styled("div")(({ theme }) => ({
  position: "relative",
  height: HEIGHT,
  "& .slick-list": {
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
}));

const StyledCard = styled("div")(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.9),
    imgUrl: "/assets/background/overlay_2.jpg",
  }),
  position: "relative",
  height: HEIGHT - 16,
  padding: theme.spacing(3),
  backgroundRepeat: "no-repeat",
  color: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const shadowStyle = {
  mx: "auto",
  width: "calc(100% - 16px)",
  borderRadius: 2,
  position: "absolute",
  height: 200,
  zIndex: 8,
  bottom: 8,
  left: 0,
  right: 0,
  bgcolor: "grey.500",
  opacity: 0.32,
} as const;

// ----------------------------------------------------------------------

interface ItemProps {
  id: string;
  cardType: string;
  balance: number;
  cardHolder: string;
  cardNumber: string;
  cardValid: string;
}

interface Props {
  list: ItemProps[];
  sx?: SxProps<Theme>;
}

export default function BankingCurrentBalance({
  list,
  sx,
}: Props): React.ReactElement | null {
  const theme = useTheme();

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === "rtl"),
    ...CarouselDots({
      sx: {
        right: 16,
        bottom: 16,
        position: "absolute",
      },
    }),
  };

  return (
    <StyledRoot sx={sx}>
      <Box sx={{ position: "relative", zIndex: 9 }}>
        <Carousel {...carouselSettings}>
          {list.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </Carousel>
      </Box>

      <Box sx={{ ...shadowStyle }} />

      <Box
        sx={{
          ...shadowStyle,
          opacity: 0.16,
          bottom: 0,
          zIndex: 7,
          width: "calc(100% - 40px)",
        }}
      />
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

interface CardItemProps {
  card: ItemProps;
}

function CardItem({ card }: CardItemProps): React.ReactElement | null {
  const { cardType, balance, cardHolder, cardNumber, cardValid } = card;

  const [showCurrency, setShowCurrency] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleShowCurrency = (): void => {
    setShowCurrency(!showCurrency);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const handleDelete = (): void => {
    handleClosePopover();
  };

  const handleEdit = (): void => {
    handleClosePopover();
  };

  return (
    <>
      <StyledCard>
        <IconButton
          color="inherit"
          onClick={handleOpenPopover}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            opacity: 0.48,
            position: "absolute",
            ...(openPopover && {
              opacity: 1,
            }),
          }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <div>
          <Typography sx={{ mb: 2, typography: "subtitle2", opacity: 0.72 }}>
            Current Balance
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ typography: "h3" }}>
              {showCurrency ? "********" : fCurrency(balance)}
            </Typography>

            <IconButton
              color="inherit"
              onClick={handleShowCurrency}
              sx={{ opacity: 0.48 }}
            >
              <Iconify
                icon={showCurrency ? "eva:eye-fill" : "eva:eye-off-fill"}
              />
            </IconButton>
          </Stack>
        </div>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
        >
          <Image
            disabledEffect
            alt="credit-card"
            src={`/assets/icons/payments/ic_${
              cardType === "mastercard" ? "mastercard" : "visa"
            }.svg`}
            sx={{ height: 24 }}
          />

          <Typography sx={{ typography: "subtitle1", textAlign: "right" }}>
            {cardNumber}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={5}>
          <div>
            <Typography sx={{ mb: 1, typography: "caption", opacity: 0.48 }}>
              Card Holder
            </Typography>

            <Typography sx={{ typography: "subtitle1" }}>
              {cardHolder}
            </Typography>
          </div>

          <div>
            <Typography sx={{ mb: 1, typography: "caption", opacity: 0.48 }}>
              Valid Dates
            </Typography>

            <Typography sx={{ typography: "subtitle1" }}>
              {cardValid}
            </Typography>
          </div>
        </Stack>
      </StyledCard>

      <MenuPopover open={openPopover} onClose={handleClosePopover}>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete card
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" />
          Edit card
        </MenuItem>
      </MenuPopover>
    </>
  );
}
