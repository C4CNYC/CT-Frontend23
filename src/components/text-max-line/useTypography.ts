// @mui
// hooks
// theme
import { remToPx } from "@theme/typography";

import { Breakpoint, useTheme } from "@mui/material/styles";
import { Variant } from "@mui/material/styles/createTypography";

import { useWidth } from "@hooks";

// ----------------------------------------------------------------------

export function useTypography(
  variant: Variant
): Record<string, string | number | undefined> {
  const theme = useTheme();

  const breakpoints = useWidth();

  const key = theme.breakpoints.up(
    (breakpoints === "xl" ? "lg" : breakpoints) as number | Breakpoint
  );

  const hasResponsive =
    variant === "h1" ||
    variant === "h2" ||
    variant === "h3" ||
    variant === "h4" ||
    variant === "h5" ||
    variant === "h6";

  const getFont: any =
    hasResponsive && theme.typography[variant][key]
      ? theme.typography[variant][key]
      : theme.typography[variant];

  const fontSize = remToPx(getFont.fontSize);

  const lineHeight = Number(theme.typography[variant].lineHeight) * fontSize;

  const { fontWeight, letterSpacing } = theme.typography[variant];

  return { fontSize, lineHeight, fontWeight, letterSpacing };
}
