import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Box, CircularProgress, Drawer, Stack } from "@mui/material";

import NavToggleButton from "./NavToggleButton";
import { Logo, NavSectionVertical, Scrollbar } from "@components";

import {
  apps,
  admin,
  social,
  general,
  socials,
  content,
  managment,
} from "./config-navigation";
import { useResponsive } from "@hooks";
import { RootState } from "src/redux/store";
import { NAV } from "../../../config-global";
import UserSection from "@sections/info/user-section";
import { Role } from "src/redux/services/enums/role.enum";

interface Props {
  openNav: boolean;
  onCloseNav: VoidFunction;
}

const menuConfig = {
  [Role.Owner]: [admin, managment, content],
  [Role.Admin]: [admin, managment, content],
  [Role.Student]: [general, apps, social, socials],
  [Role.Manager]: [managment, content],
  [Role.Editor]: [content],
};

export default function NavVertical({
  openNav,
  onCloseNav,
}: Props): React.ReactElement | null {
  const isStudentMode = useSelector((state: RootState) => state.global.isStudent);
  const user = useSelector((state: RootState) => state.global.user);
  const { pathname } = useRouter();

  const isDesktop = useResponsive("up", "lg");
  const menu = menuConfig[
    isStudentMode
      ? Role.Student
      : user?.role as Role
    ];

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
