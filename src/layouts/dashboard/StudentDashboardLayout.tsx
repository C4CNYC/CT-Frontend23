import { useRouter } from "next/router";
import { useState } from "react";

import { Box } from "@mui/material";

import { useSettingsContext } from "@components";
import { useResponsive } from "@hooks";

import AuthGuard from "../../auth/AuthGuard";
import Main from "./Main";
import Header from "./header";
import NavHorizontal from "./nav/NavHorizontal";
import NavMini from "./nav/NavMini";
import NavVertical from "./nav/NavVertical";

interface Props {
  children?: React.ReactNode;
}

export function StudentDashboardLayout({
  children,
}: Props): React.ReactElement | null {
  const { themeLayout } = useSettingsContext();
  const { pathname } = useRouter();

  const isDesktop = useResponsive("up", "lg");

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini" || pathname.includes("courses/");

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const renderNavVertical = (
    <NavVertical openNav={open} onCloseNav={handleClose} />
  );

  const renderContent = (): React.ReactElement => {
    if (isNavHorizontal) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          {isDesktop ? <NavHorizontal /> : renderNavVertical}

          <Main>{children}</Main>
        </>
      );
    }

    if (isNavMini) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          <Box
            sx={{
              display: { lg: "flex" },
              minHeight: { lg: 1 },
            }}
          >
            {isDesktop ? <NavMini /> : renderNavVertical}

            <Main>{children}</Main>
          </Box>
        </>
      );
    }

    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: "flex" },
            minHeight: { lg: 1 },
          }}
        >
          {renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    );
  };

  return <AuthGuard> {renderContent()} </AuthGuard>;
}
