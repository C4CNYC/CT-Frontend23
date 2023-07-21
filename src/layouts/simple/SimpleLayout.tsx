// next
import dynamic from "next/dynamic";

// hooks
import { useOffSetTop } from "@hooks";

// config
import { HEADER } from "../../config-global";

//
const Header = dynamic(async () => await import("./Header"), { ssr: false });

// ----------------------------------------------------------------------

interface Props {
  children?: React.ReactNode;
}

export default function SimpleLayout({
  children,
}: Props): React.ReactElement | null {
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <>
      <Header isOffset={isOffset} />

      {children}
    </>
  );
}
