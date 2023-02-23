import { m } from "framer-motion";
import { useState } from "react";
// @mui
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  ListItemButton,
  Paper,
  Toolbar,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import { MotionViewport, varFade } from "../../components/animate";
import Iconify from "../../components/iconify";
import Image from "../../components/image";
import TextMaxLine from "../../components/text-max-line";

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    label: "Managing your account",
    icon: "/assets/icons/faqs/ic_account.svg",
    href: "#",
  },
  {
    label: "Payment",
    icon: "/assets/icons/faqs/ic_payment.svg",
    href: "#",
  },
  {
    label: "Delivery",
    icon: "/assets/icons/faqs/ic_delivery.svg",
    href: "#",
  },
  {
    label: "Problem with the Product",
    icon: "/assets/icons/faqs/ic_package.svg",
    href: "#",
  },
  {
    label: "Return & Refund",
    icon: "/assets/icons/faqs/ic_refund.svg",
    href: "#",
  },
  {
    label: "Guarantees and assurances",
    icon: "/assets/icons/faqs/ic_assurances.svg",
    href: "#",
  },
];

// ----------------------------------------------------------------------

export default function FaqsCategory(): React.ReactElement {
  const isDesktop = useResponsive("up", "md");
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  if (!isDesktop) {
    return (
      <>
        <AppBar position="absolute" color="transparent" sx={{ boxShadow: 0 }}>
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="soft"
              startIcon={<Iconify icon="eva:menu-2-fill" />}
              onClick={handleOpen}
            >
              Categories
            </Button>
          </Toolbar>
          <Divider />
        </AppBar>

        <Drawer open={open} onClose={handleClose}>
          <Box
            gap={1}
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            sx={{ p: 1 }}
          >
            {CATEGORIES.map((category) => (
              <CardMobile key={category.label} category={category} />
            ))}
          </Box>
        </Drawer>
      </>
    );
  }

  return (
    <Box
      component={MotionViewport}
      gap={2.5}
      display="grid"
      gridTemplateColumns={{
        md: "repeat(3, 1fr)",
        lg: "repeat(6, 1fr)",
      }}
      sx={{ mb: 15 }}
    >
      {CATEGORIES.map((category) => (
        <m.div key={category.label} variants={varFade().in}>
          <CardDesktop category={category} />
        </m.div>
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

interface CardProps {
  category: {
    label: string;
    icon: string;
  };
}

function CardDesktop({ category }: CardProps): React.ReactElement | null {
  const { label, icon } = category;

  return (
    <Paper
      variant="outlined"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        textAlign: "center",
        borderColor: (theme) => alpha(theme.palette.grey[500], 0.12),
        "&:hover": {
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
    >
      <Image
        disabledEffect
        alt={icon}
        src={icon}
        sx={{ mb: 2, width: 80, height: 80, mx: "auto" }}
      />

      <TextMaxLine variant="subtitle2" persistent>
        {label}
      </TextMaxLine>
    </Paper>
  );
}

// ----------------------------------------------------------------------

function CardMobile({ category }: CardProps): React.ReactElement | null {
  const { label, icon } = category;

  return (
    <ListItemButton
      key={label}
      sx={{
        py: 2,
        maxWidth: 140,
        borderRadius: 1,
        textAlign: "center",
        typography: "body2",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        bgcolor: "background.neutral",
      }}
    >
      <Image alt={icon} src={icon} sx={{ width: 48, height: 48, mb: 1 }} />
      {category.label}
    </ListItemButton>
  );
}
