import { type Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Stepper(theme: Theme): unknown {
  return {
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: theme.palette.divider,
        },
      },
    },
  };
}
