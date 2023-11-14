// node modules
import NextLink from "next/link";
import { useRouter } from "next/router";
import { type ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import Hamburger from "hamburger-react";
import { useSnackbar } from "notistack";

// @mui
import {
  Divider,
  Link,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Box } from "@mui/system";

// components
import { Iconify, MenuPopover } from "@components";

import MobileHamburger from "./MobileHamburger";

// local files
import { PATH_AUTH } from "@routes/paths";
import { useAuthContext } from "src/auth/useAuthContext";
import { useSelector } from "src/redux/store";
import { setStartTour } from "src/redux/slices/tour";

import { UserType } from "@utils";
import config, { ILinks } from "./config";
import {
  DESKTOP_ANCHOR_ORIGIN,
  MOBILE_ANCHOR_ORIGIN,
  HUMBURGER_SIZE,
  SNACKBAR_OPTIONS,
  MENU_ITEM_STYLES,
  MENU_POPOVER_STYLES,
  GLOBAL_BOX_STYLES,
  MENU_ICONIFY,
  MENU_ITEM_TYPOGRAFY
} from './constants'

interface CustomMultiEvent {
  currentTarget: HTMLElement
}

const Menu = (): React.ReactElement => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const dispatch = useDispatch()
  const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, logout } = useAuthContext();
  const userName = useSelector((state) => state.global.user?.first_name);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleLogout = (): void => {
    try {
      logout();
      replace(PATH_AUTH.singIn);
      handleClosePopover();
    } catch (error: any) {
      enqueueSnackbar("Unable to logout!", SNACKBAR_OPTIONS);
    }
  };

  const handleOpenPopover = (event: CustomMultiEvent): void => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const getHumburger = (isDesktop: boolean): ReactNode => {
    return isDesktop ? (
      <Hamburger size={HUMBURGER_SIZE} toggled={Boolean(openPopover)} />
    ) : (
      <MobileHamburger
        open={Boolean(openPopover)}
        handleOpenPopover={handleOpenPopover}
        handleClosePopover={handleClosePopover}
      />
    )
  }

  const anchorOriginProps = isDesktop
    ? DESKTOP_ANCHOR_ORIGIN
    : MOBILE_ANCHOR_ORIGIN

  return (
    <Box sx={!isDesktop ? GLOBAL_BOX_STYLES : null}>
      <Box className="menuTourMobile" onClick={handleOpenPopover}>
        {getHumburger(isDesktop)}
      </Box>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={MENU_POPOVER_STYLES}
        anchorOrigin={anchorOriginProps}
      >
        {isAuthenticated && (
          <Typography height="59px" p="16px 20px" variant="h6" component="h2">
            Hello {userName ? userName : ""}
          </Typography>
        )}
        
        <Divider />

        {config[isAuthenticated ? UserType.Authorized : UserType.Anonim].map(
          (menuItem) => {
            if (menuItem.href === ILinks.modal) {
              return menuItem.component?.(
                <MenuItem
                  sx={MENU_ITEM_STYLES}
                  onClick={() => {
                    if (menuItem.title === "Take the Tour") {
                      dispatch(setStartTour(true));
                    }
                  }}
                >
                  <Iconify sx={MENU_ICONIFY} icon={menuItem.icon} />

                  <Box>
                    <Typography sx={MENU_ITEM_TYPOGRAFY} variant="button">
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
                    sx={MENU_ITEM_STYLES}
                    onClick={handleClosePopover}
                  >
                    <Iconify
                      sx={MENU_ICONIFY}
                      icon={menuItem.icon}
                    />

                    <Box>
                      <Typography sx={MENU_ITEM_TYPOGRAFY} variant="button">
                        {menuItem.title}
                      </Typography>

                      <br />

                      {menuItem.subTitle && (
                        <Typography variant="caption">
                          {menuItem.subTitle.toUpperCase()}
                        </Typography>
                      )}
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
