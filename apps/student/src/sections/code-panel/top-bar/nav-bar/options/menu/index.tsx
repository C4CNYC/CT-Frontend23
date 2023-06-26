import { Box } from "@mui/system";
import Hamburger from "hamburger-react";
import { SetStateAction, useState } from "react";

import { Iconify, MenuPopover } from "@ct-nx/components";
import {
  Divider,
  Link,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAuthContext } from "src/auth/useAuthContext";
import { UserType } from "@ct-nx/utils";

import { PATH_AUTH } from "@routes/paths";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import config, { ILinks } from "./config";
import MobileHamburger from "./MobileHamburger";

const Menu = (): React.ReactElement => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openPopover, setOpenPopover] = useState(null);
  const { isAuthenticated, logout } = useAuthContext();
  const handleLogout = (): void => {
    try {
      logout();
      replace(PATH_AUTH.login);
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
            Hello John
          </Typography>
        ) : null}
        <Divider />
        {config[isAuthenticated ? UserType.Authorized : UserType.Anonim].map(
          (menuItem, i) => {
            if (menuItem.href === ILinks.modal) {
              return menuItem.component?.(
                <MenuItem
                  key={i}
                  sx={{ pl: "20px!important", height: 59, color: "#212B36" }}
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
              );
            } else {
              return (
                <Link
                  key={`${menuItem.title}${i}`}
                  component={NextLink}
                  href={menuItem.href}
                  onClick={() => {
                    if (menuItem.href === ILinks.logout) {
                      handleLogout();
                    }
                  }}
                  underline="none"
                >
                  <MenuItem
                    key={i}
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
