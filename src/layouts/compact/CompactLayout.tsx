import dynamic from "next/dynamic";

import { Container, Stack } from "@mui/material";

import { useOffSetTop } from "@hooks";
import { HEADER } from "../../config-global";

const Header = dynamic(async () => await import("./Header"), { ssr: false });

interface Props {
  children?: React.ReactNode;
}

export default function CompactLayout({
  children,
}: Props): React.ReactElement | null {
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <>
      <Header isOffset={isOffset} />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: "auto",
            maxWidth: 400,
            minHeight: "100vh",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
