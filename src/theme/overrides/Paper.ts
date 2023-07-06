import { type Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Paper(theme: Theme): unknown {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  };
}
