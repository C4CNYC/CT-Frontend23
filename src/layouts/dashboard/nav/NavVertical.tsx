import Logo from "@components/logo";
import { NavSectionVertical } from "@components/nav-section";
import Scrollbar from "@components/scrollbar";
import { Box, Drawer, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserSection from "src/components/user-section";
import { Role } from "src/redux/services/enums/role.enum";
import { RootState } from "src/redux/store";
import { NAV } from "../../../config-global";
import useResponsive from "../../../hooks/useResponsive";
import { admin, content, managment } from "./config-navigation";
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
  const user = useSelector((state: RootState) => state.global.user);
  const { pathname } = useRouter();

  const isDesktop = useResponsive("up", "lg");
  const menu = [Role.Owner, Role.Admin].includes(user?.role ?? Role.Manager)
    ? [admin, managment, content]
    : [managment, content];

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
          spacing={3}
          sx={{
            pt: 3,
            pb: 2,
            px: 2.5,
            flexShrink: 0,
          }}
        >
          <Logo />
          <UserSection />
        </Stack>

        <Stack
          sx={{
            p: "14px 15px 0 16px",
          }}
        ></Stack>

        <NavSectionVertical data={menu} />
      </>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

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
