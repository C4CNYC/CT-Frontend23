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
import { useSettingsContext } from "@ct-nx/components";
//
import { customShadows, GlobalStyles, ComponentsOverrides, palette, shadows, typography } from "@ct-nx/theme";

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
}

export function ThemeProvider({
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

  theme.components = ComponentsOverrides(theme) as Components;

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MUIThemeProvider>
  );
}
