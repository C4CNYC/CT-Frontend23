import { type CheckboxProps } from "@mui/material";
import { type Theme } from "@mui/material/styles";

//
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  CheckboxIndeterminateIcon,
} from "./CustomIcons";

// ----------------------------------------------------------------------

export default function Checkbox(theme: Theme): unknown {
  return {
    MuiCheckbox: {
      defaultProps: {
        icon: <CheckboxIcon />,
        checkedIcon: <CheckboxCheckedIcon />,
        indeterminateIcon: <CheckboxIndeterminateIcon />,
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: CheckboxProps }) => ({
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
