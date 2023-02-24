import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  Components,
  createTheme,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
// components
import { useSettingsContext } from "../components/settings";
//
import customShadows from "./customShadows";
import GlobalStyles from "./globalStyles";
import componentsOverride from "./overrides";
import palette from "./palette";
import shadows from "./shadows";
import typography from "./typography";

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider({
  children,
}: Props): React.ReactElement | null {
  const { themeMode, themeDirection } = useSettingsContext();

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette(themeMode),
      typography,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: shadows(themeMode),
      customShadows: customShadows(themeMode),
    }),
    [themeDirection, themeMode]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme) as Components;

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MUIThemeProvider>
  );
}
