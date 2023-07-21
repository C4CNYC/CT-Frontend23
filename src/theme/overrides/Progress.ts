import { type LinearProgressProps, alpha } from "@mui/material";
import { type Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

const COLORS = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
] as const;

export default function Progress(theme: Theme): unknown {
  const rootStyle = (ownerState: LinearProgressProps): unknown => {
    const bufferVariant = ownerState.variant === "buffer";

    const defaultStyle = {
      borderRadius: 4,
      "& .MuiLinearProgress-bar": {
        borderRadius: 4,
      },
      ...(bufferVariant && {
        backgroundColor: "transparent",
      }),
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        backgroundColor: alpha(theme.palette[color].main, 0.24),
      }),
    }));

    return [...colorStyle, defaultStyle];
  };

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: LinearProgressProps }) =>
          rootStyle(ownerState),
      },
    },
  };
}
