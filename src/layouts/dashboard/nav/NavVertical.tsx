import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSelector } from "react-redux";

import { Box, Drawer, Stack } from "@mui/material";

import { Logo, NavSectionVertical, Scrollbar } from "@components";
import { useResponsive } from "@hooks";
import { Role } from "src/redux/services/enums/role.enum";
import { RootState } from "src/redux/store";

import { NAV } from "../../../config-global";
import LetsCodeBtn from "./LestCodeBtn";
import NavToggleButton from "./NavToggleButton";
import { menuConfig } from "./config-navigation";

interface INavVertical {
  openNav: boolean;
  isManager?: boolean;
  onCloseNav: VoidFunction;
}

export default function NavVertical({
  openNav,
  isManager,
  onCloseNav,
}: INavVertical): React.ReactElement | null {
  const user = useSelector((state: RootState) => state.global.user);
  const { pathname } = useRouter();

  const isDesktop = useResponsive("up", "lg");
  const menu = isManager
    ? menuConfig[user?.role as Role]
    : menuConfig[Role.Student];

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
            pt: 3,
            pb: 2,
            px: 1,
            flexShrink: 0,
          }}
        >
          <Logo />
          {!isManager ? <LetsCodeBtn /> : null}
        </Stack>

        <NavSectionVertical data={menu} />
      </>
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
