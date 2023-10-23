import NextLink from "next/link";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";

import Hamburger from "hamburger-react";
import { useAtom } from "jotai";
import { useSnackbar } from "notistack";

import {
  Divider,
  Link,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";

import { Iconify, MenuPopover } from "@components";
import { PATH_AUTH } from "@routes/paths";
import { startTour } from "@sections/code-panel/code-panel-tour/tour-atom";
import { UserType } from "@utils";
import { useAuthContext } from "src/auth/useAuthContext";
import { useSelector } from "src/redux/store";

import MobileHamburger from "./MobileHamburger";
import config, { ILinks } from "./config";

const Menu = (): React.ReactElement => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, logout } = useAuthContext();
  const userName = useSelector((state) => state.global.user?.first_name);
  const [, setStartTour] = useAtom(startTour);

  const [openPopover, setOpenPopover] = useState(null);

  const handleLogout = (): void => {
    try {
      logout();
      replace(PATH_AUTH.signIn);
      handleClosePopover();
    } catch (error: any) {
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  // check better solution for event type
  const handleOpenPopover = (
    event: React.SyntheticEvent<SetStateAction<any>>
  ): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  return (
    <Box
      sx={
        isDesktop ? {} : { position: "absolute", top: 10, right: -5, zIndex: 1 }
      }
    >
      <Box className="menuTourMobile" onClick={handleOpenPopover}>
        {isDesktop ? (
          <Hamburger size={18} toggled={Boolean(openPopover)} />
        ) : (
          <MobileHamburger
            open={openPopover}
            handleOpenPopover={handleOpenPopover}
            handleClosePopover={handleClosePopover}
          />
        )}
      </Box>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{
          minWidth: 255,
          p: 0,
          background: "#FBDD3F",
          "&>span": {
            background: "#FBDD3F",
            right: "24px",
          },
        }}
        anchorOrigin={
          !isDesktop
            ? {
                vertical: 40,
                horizontal: 50,
              }
            : {
                vertical: 50,
                horizontal: 47,
              }
        }
      >
        {isAuthenticated ? (
          <Typography height="59px" p="16px 20px" variant="h6" component="h2">
            Hello {userName ?? ""}
          </Typography>
        ) : null}
        <Divider />
        {config[isAuthenticated ? UserType.Authorized : UserType.Anonim].map(
          (menuItem) => {
            if (menuItem.href === ILinks.modal) {
              return menuItem.component?.(
                <MenuItem
                  sx={{ pl: "20px!important", height: 59, color: "#212B36" }}
                  onClick={() => {
                    if (menuItem.title === "Take the Tour") {
                      setStartTour({ start: true });
                    }
                  }}
                >
                  <Iconify
                    sx={{ width: "35px!important", height: "35px!important" }}
                    icon={menuItem.icon}
                  />
                  <Box>
                    <Typography sx={{ color: "#EE467A" }} variant="button">
                      {menuItem.title}
                    </Typography>
                  </Box>
                </MenuItem>,
                menuItem.title
              );
            } else {
              return (
                <Link
                  key={menuItem.title}
                  component={NextLink}
                  href={menuItem.href}
                  target={menuItem.target ? menuItem.target : "_self"}
                  onClick={() => {
                    if (menuItem.href === ILinks.logout) {
                      handleLogout();
                    }
                  }}
                  underline="none"
                >
                  <MenuItem
                    sx={{ pl: "20px!important", height: 59, color: "#212B36" }}
                    onClick={handleClosePopover}
                  >
                    <Iconify
                      sx={{ width: "35px!important", height: "35px!important" }}
                      icon={menuItem.icon}
                    />
                    <Box>
                      <Typography sx={{ color: "#EE467A" }} variant="button">
                        {menuItem.title}
                      </Typography>
                      <br />
                      {menuItem.subTitle ? (
                        <Typography variant="caption">
                          {menuItem.subTitle.toUpperCase()}
                        </Typography>
                      ) : null}
                    </Box>
                  </MenuItem>
                </Link>
              );
            }
          }
        )}
      </MenuPopover>
    </Box>
  );
};
export default Menu;
