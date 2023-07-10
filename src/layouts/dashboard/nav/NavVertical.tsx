import { Logo, NavSectionVertical, Scrollbar } from "@components";
import { useResponsive } from "@hooks";
import { Box, CircularProgress, Drawer, Stack } from "@mui/material";
import UserSection from "@sections/info/user-section";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Role } from "src/redux/services/enums/role.enum";
import { RootState } from "src/redux/store";
import { NAV } from "../../../config-global";
import NavToggleButton from "./NavToggleButton";
import { menuConfig } from "./config-navigation";
// ----------------------------------------------------------------------

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
    : menuConfig[Role.Student]

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
          <Stack sx={{ mt: "30px" }}></Stack>
          <UserSection />
        </Stack>

        <NavSectionVertical data={menu} />
      </>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

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
