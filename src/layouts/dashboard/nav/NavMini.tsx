import { useSelector } from "react-redux";

import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/system";

import { LogoMin } from "src/components/logo";
import { NavSectionMini } from "src/components/nav-section";
import { hideScrollbarX } from "src/utils/cssStyles";
import { Role } from "src/redux/services/enums/role.enum";
import { RootState } from "src/redux/store";

import { NAV } from "../../../config-global";
import LetsCodeBtn from "./LestCodeBtn";
import NavToggleButton from "./NavToggleButton";
import { menuConfig } from "./config-navigation";

interface INavMini {
  isManager?: boolean;
}

export default function NavMini({ isManager }: INavMini): React.ReactElement {
  const user = useSelector((state: RootState) => state.global.user);
  const theme = useTheme();
  const menu = isManager
    ? menuConfig[user?.role as Role]
    : menuConfig[Role.Student];

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { md: 0 },
        width: { md: NAV.W_DASHBOARD_MINI },
        bgcolor:
          theme.palette.mode === "light"
            ? "#E6F5FD"
            : theme.palette.background.paper,
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: "fixed",
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <LogoMin
          sx={{
            my: 2,
            ml: 2.6,
          }}
        />
        {!isManager ? <LetsCodeBtn isMini /> : null}
        <NavSectionMini data={menu} />
      </Stack>
    </Box>
  );
}
