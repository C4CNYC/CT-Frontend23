import { type RadioProps } from "@mui/material";
import { type Theme } from "@mui/material/styles";

//
import { RadioCheckedIcon, RadioIcon } from "./CustomIcons";

// ----------------------------------------------------------------------

export default function Radio(theme: Theme): unknown {
  return {
    MuiRadio: {
      defaultProps: {
        icon: <RadioIcon />,
        checkedIcon: <RadioCheckedIcon />,
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: RadioProps }) => ({
          padding: theme.spacing(1),
          ...(ownerState.size === "small" && {
            "& svg": { width: 20, height: 20 },
          }),
          ...(ownerState.size === "medium" && {
            "& svg": { width: 24, height: 24 },
          }),
        }),
      },
    },
  };
}
