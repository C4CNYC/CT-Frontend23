import { type Theme } from "@mui/material/styles";

//
import { InputSelectIcon } from "./CustomIcons";

// ----------------------------------------------------------------------

export default function Select(theme: Theme): unknown {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon,
      },
    },
  };
}
