// next
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// @mui
import { Box } from "@mui/material";

//
const Header = dynamic(async () => await import("./Header"), { ssr: false });

// ----------------------------------------------------------------------

interface Props {
  children?: React.ReactNode;
}

export default function MainLayout({
  children,
}: Props): React.ReactElement | null {
  const { pathname } = useRouter();

  const isHome = pathname === "/";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
