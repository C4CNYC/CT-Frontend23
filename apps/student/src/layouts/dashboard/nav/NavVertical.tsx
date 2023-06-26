import { NavSectionVertical } from "@components/nav-section";
import { Scrollbar, Logo } from "@ct-nx/components";
import { Box, Drawer, Stack } from "@mui/material";
import LetsCodeBtn from "@sections/home/LetsCodeBtn";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "src/redux/store";
import { NAV } from "../../../config-global";
import { useResponsive } from "@ct-nx/hooks";
import navConfig from "./config-navigation";
import NavToggleButton from "./NavToggleButton";
// ----------------------------------------------------------------------

interface Props {
  openNav: boolean;
  onCloseNav: VoidFunction;
}

export default function NavVertical({
  openNav,
  onCloseNav,
}: Props): React.ReactElement | null {
  const { pathname } = useRouter();

  const isDesktop = useResponsive("up", "lg");
  const menu = navConfig;

  const galleryAllowed = useSelector(
    (state) => state.schoolSettings.gallery_allowed
  );

  if (!galleryAllowed) {
    navConfig[1].items.splice(2, 1);
  }
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <>
        <Stack
          sx={{
            pt: 2,
            pb: 2,
            px: "26px",
            flexShrink: 0,
          }}
        >
          <Logo sx={{ ml: 2 }} />
          <LetsCodeBtn />
          <NavSectionVertical data={menu} />
        </Stack>
      </>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        maxHeight: "100vh",
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
          {renderContent}
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
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
