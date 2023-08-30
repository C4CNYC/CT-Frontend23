import React, { useEffect } from "react";
// emotion
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
// rtl
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

// @mui
import { useTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
}

export default function ThemeRtlLayout({ children }: Props): React.ReactElement | null {
  const theme = useTheme();

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cacheRtl = createCache({
    key: "rtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  if (theme.direction === "rtl") {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }

  return <>{children}</>;
}
