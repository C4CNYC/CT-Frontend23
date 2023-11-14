import NextLink from "next/link";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";

import Hamburger from "hamburger-react";
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
import { useAuthContext } from "src/auth/useAuthContext";

import { menuConfig } from "./menu-config";

const Menu = (): React.ReactElement => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const { replace, push, pathname } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openPopover, setOpenPopover] = useState(null);
  const { user, logout } = useAuthContext();
  const onClose = (): void => {
    push(pathname, undefined, { shallow: true });
  };
  const handleLogout = (): void => {
    try {
      logout();
      replace(PATH_AUTH.singIn);
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
    <Box>
      <Box onClick={handleOpenPopover} sx={{ ml: -1, mt: "2px" }}>
        <Hamburger size={18} toggled={Boolean(openPopover)} />
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
        <Typography height="59px" p="16px 20px" variant="h6" component="h2">
          Hello {`${user?.first_name}`}
        </Typography>

        <Divider />
        {menuConfig.map((menuItem, i) => (
          <Link
            key={`${menuItem.title}${i}`}
            component={NextLink}
            href={
              menuItem.href !== "" && menuItem.href !== "close"
                ? menuItem.href
                : ""
            }
            onClick={() => {
              if (menuItem.href === "") {
                handleLogout();
              }
              if (menuItem.href === "close") {
                onClose();
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
        ))}
      </MenuPopover>
    </Box>
  );
};
export default Menu;
