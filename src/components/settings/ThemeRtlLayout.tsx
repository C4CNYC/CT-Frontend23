import { prefixer } from "stylis";
import { useEffect } from "react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";

import { useTheme } from "@mui/material/styles";

interface Props {
  children: React.ReactNode;
}

export default function ThemeRtlLayout({
  children,
}: Props): React.ReactElement | null {
  const theme = useTheme();

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cacheRtl = createCache({
    key: theme.direction === "rtl" ? "rtl" : "css",
    stylisPlugins: theme.direction === "rtl" ? [prefixer, rtlPlugin] : [],
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
