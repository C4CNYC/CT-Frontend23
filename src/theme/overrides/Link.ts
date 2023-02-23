import { type Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Link(theme: Theme): unknown {
  return {
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
  };
}
