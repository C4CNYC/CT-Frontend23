import { Box, Stack } from "@mui/material";

import { 
  LogoMin, 
  NavSectionMini,
} from "@components";

import { hideScrollbarX } from "@utils";

import navConfig from "./config-navigation";
import { NAV } from "../../../config-global";
import NavToggleButton from "./NavToggleButton";

export default function NavMini(): React.ReactElement {
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
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
            ml: 2.2,
          }}
        />

        <NavSectionMini data={navConfig} />
      </Stack>
    </Box>
  );
}
