import { useMemo } from "react";

import merge from "lodash/merge";

// @mui
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";

//
import { useSettingsContext } from "./SettingsContext";

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
}

export default function ThemeContrast({
  children,
}: Props): React.ReactElement | null {
  const outerTheme = useTheme();

  const { themeContrast, themeMode } = useSettingsContext();

  const isLight = themeMode === "light";

  const isContrastBold = themeContrast === "bold";

  const themeOptions = useMemo(
    () => ({
      palette: {
        background: {
          ...(isContrastBold && {
            default: isLight
              ? outerTheme.palette.grey[100]
              : outerTheme.palette.grey[900],
          }),
        },
      },
      components: {
        MuiCard: {
          styleOverrides: {
            ...(isContrastBold && {
              root: {
                boxShadow: outerTheme.customShadows.z4,
              },
            }),
          },
        },
      },
    }),
    [isLight, themeContrast]
  );

  const theme = createTheme(merge(outerTheme, themeOptions));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
