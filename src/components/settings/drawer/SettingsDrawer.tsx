import { useRouter } from "next/router";
import { useState } from "react";

// @mui
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

// utils
import { bgBlur } from "@utils";
import { useTranslate } from "src/utils/translateHelper";

// config
import { NAV } from "../../../config-global";
//
import { Iconify } from "../../iconify";
import { Scrollbar } from "../../scrollbar";
import { useSettingsContext } from "../SettingsContext";
//
import { defaultSettings } from "../config-setting";
import BadgeDot from "./BadgeDot";
import Block from "./Block";
import ColorPresetsOptions from "./ColorPresetsOptions";
import ContrastOptions from "./ContrastOptions";
import DirectionOptions from "./DirectionOptions";
import FullScreenOptions from "./FullScreenOptions";
import LayoutOptions from "./LayoutOptions";
import ModeOptions from "./ModeOptions";
import StretchOptions from "./StretchOptions";
import ToggleButton from "./ToggleButton";

// ----------------------------------------------------------------------

const SPACING = 2.5;

export default function SettingsDrawer(): React.ReactElement {
  const { pathname } = useRouter();
  const {
    themeMode,
    themeLayout,
    themeStretch,
    themeContrast,
    themeDirection,
    themeColorPresets,
    onResetSetting,
  } = useSettingsContext();

  const theme = useTheme();
  const translate = useTranslate();

  const [open, setOpen] = useState(false);

  const handleToggle = (): void => {
    setOpen(!open);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const notDefault =
    themeMode !== defaultSettings.themeMode ||
    themeLayout !== defaultSettings.themeLayout ||
    themeStretch !== defaultSettings.themeStretch ||
    themeContrast !== defaultSettings.themeContrast ||
    themeDirection !== defaultSettings.themeDirection ||
    themeColorPresets !== defaultSettings.themeColorPresets;

  if (pathname.includes("code-panel")) {
    return <></>;
  }
  return (
    <>
      {!open && (
        <ToggleButton
          open={open}
          notDefault={notDefault}
          onToggle={handleToggle}
        />
      )}

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        BackdropProps={{ invisible: true }}
        PaperProps={{
          sx: {
            ...bgBlur({
              color: theme.palette.background.default,
              opacity: 0.9,
            }),
            width: NAV.W_BASE,
            boxShadow: `-24px 12px 40px 0 ${alpha(
              theme.palette.mode === "light"
                ? theme.palette.grey[500]
                : theme.palette.common.black,
              0.16
            )}`,
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2, pr: 1, pl: SPACING }}
        >
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            {translate("settings")}
          </Typography>

          <Tooltip title={translate("actions_reset")}>
            <Box sx={{ position: "relative" }}>
              {notDefault && <BadgeDot />}
              <IconButton onClick={onResetSetting}>
                <Iconify icon="ic:round-refresh" />
              </IconButton>
            </Box>
          </Tooltip>

          <IconButton onClick={handleClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar sx={{ p: SPACING, pb: 0 }}>
          <Block title={translate("mode")}>
            <ModeOptions />
          </Block>

          <Block title={translate("contrast")}>
            <ContrastOptions />
          </Block>

          <Block title={translate("direction")}>
            <DirectionOptions />
          </Block>

          <Block title={translate("layout")}>
            <LayoutOptions />
          </Block>

          <Block
            title={translate("stretch")}
            tooltip={translate("stretch_tooltip")}
          >
            <StretchOptions />
          </Block>

          <Block title={translate("presets")}>
            <ColorPresetsOptions />
          </Block>
        </Scrollbar>

        <Box sx={{ p: SPACING, pt: 0 }}>
          <FullScreenOptions />
        </Box>
      </Drawer>
    </>
  );
}
