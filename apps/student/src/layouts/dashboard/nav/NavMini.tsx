// @mui
import { Box, Stack } from "@mui/material";
// config
import { NAV } from "../../../config-global";
// utils
import { hideScrollbarX } from "@ct-nx/utils";
// components
import { NavSectionMini } from "@components/nav-section";
//
import { LogoMin } from "@ct-nx/components";
import LetsCodeBtn from "@sections/home/LetsCodeBtn";
import { useRouter } from "next/router";
import { useSelector } from "src/redux/store";
import navConfig from "./config-navigation";
import NavToggleButton from "./NavToggleButton";

// ----------------------------------------------------------------------

export default function NavMini(): React.ReactElement {
  const path = useRouter();

  const galleryAllowed = useSelector(
    (state) => state.schoolSettings.gallery_allowed
  );
  if (!galleryAllowed) {
    navConfig[1].items.splice(2, 1);
  }
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
          display: path.pathname === "/courses/[id]" ? "none" : "inline-flex",
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
        <LetsCodeBtn isMini={true}/>
        <NavSectionMini data={navConfig} />
      </Stack>
    </Box>
  );
}
