import { type Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Popover(theme: Theme): unknown {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.dropdown,
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
        },
      },
    },
  };
}
