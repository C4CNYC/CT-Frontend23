import { Box, CircularProgress, Drawer } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { NAV } from "../../../config-global";
import useResponsive from "../../../hooks/useResponsive";
import NavToggleButton from "./NavToggleButton";
import { NavContent } from "./nav-content";
// ----------------------------------------------------------------------

interface Props {
  openNav: boolean;
  onCloseNav: VoidFunction;
}

export default function NavVertical({
  openNav,
  onCloseNav,
}: Props): React.ReactElement | null {
  const user = useSelector((state: RootState) => state.global.user);
  const { pathname } = useRouter();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  if (!user?.role) return <CircularProgress />;

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      <NavToggleButton />

      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: "transparent",
              borderRightStyle: "dashed",
            },
          }}
        >
          <NavContent/>
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          <NavContent/>
        </Drawer>
      )}
    </Box>
  );
}
