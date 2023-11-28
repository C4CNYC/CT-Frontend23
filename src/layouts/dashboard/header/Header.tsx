import { useRouter } from "next/router";

import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Iconify, Logo, useSettingsContext } from "@components";
import { useOffSetTop, useResponsive } from "@hooks";
import { bgBlur } from "@utils";
import ThemeSwitcher from "src/components/theme-switcher";
import { useSelector } from "src/redux/store";

import { HEADER, NAV } from "../../../config-global";
import AccountPopover from "./AccountPopover";
import LanguagePopover from "./LanguagePopover";
import NavAccount from "./SchoolAccount";

// ----------------------------------------------------------------------

interface Props {
  onOpenNav?: VoidFunction;
}

export default function Header({
  onOpenNav,
}: Props): React.ReactElement | null {
  const theme = useTheme();
  const router = useRouter();
  const user = useSelector((state) => state.global.user);

  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const isDesktop = useResponsive("up", "lg");

  const isSchoolSection = router.pathname.includes("dashboard/school");

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: "text.primary" }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {isSchoolSection ? <NavAccount /> : null}
      <Typography
        variant="h4"
        sx={{
          color: "rgba(54, 73, 84, 1)",
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        Hey {user?.first_name ? user.first_name : "Friend"}
        <Typography variant="h3">👋</Typography>
      </Typography>
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        <ThemeSwitcher />
        <LanguagePopover />

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: "background.default",
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
