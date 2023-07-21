import { useMemo } from "react";

import merge from "lodash/merge";

// @mui
import {
  ThemeProvider,
  alpha,
  createTheme,
  useTheme,
} from "@mui/material/styles";

//
import { useSettingsContext } from "./SettingsContext";

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
}

export default function ThemeColorPresets({
  children,
}: Props): React.ReactElement | null {
  const outerTheme = useTheme();

  const { presetsColor } = useSettingsContext();

  const themeOptions = useMemo(
    () => ({
      palette: {
        primary: presetsColor,
      },
      customShadows: {
        primary: `0 8px 16px 0 ${alpha(presetsColor.main, 0.24)}`,
      },
    }),
    [presetsColor]
  );

  const theme = createTheme(merge(outerTheme, themeOptions));

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
