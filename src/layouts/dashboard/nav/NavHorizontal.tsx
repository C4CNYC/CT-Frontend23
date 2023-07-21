import { memo } from "react";

import { useSelector } from "react-redux";

// @mui
import { AppBar, Box, BoxProps, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// components
import { NavSectionHorizontal } from "@components";
// utils
import { bgBlur } from "@utils";
import { Role } from "src/redux/services/enums/role.enum";
import { RootState } from "src/redux/store";

// config
import { HEADER } from "../../../config-global";
//
import { menuConfig } from "./config-navigation";

// ----------------------------------------------------------------------

interface INavHorizontal {
  isManager?: boolean;
}

function NavHorizontal({ isManager }: INavHorizontal): React.ReactElement {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.global.user);
  const menu = isManager
    ? menuConfig[user?.role as Role]
    : menuConfig[Role.Student];

  return (
    <AppBar
      component="nav"
      color="transparent"
      sx={{
        boxShadow: 0,
        top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <NavSectionHorizontal data={menu} />
      </Toolbar>

      <Shadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps): React.ReactElement {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        width: 1,
        m: "auto",
        borderRadius: "50%",
        position: "absolute",
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
