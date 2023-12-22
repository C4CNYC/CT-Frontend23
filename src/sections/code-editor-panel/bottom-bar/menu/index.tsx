import { type FC, useMemo, useState } from "react";

import { GiSave } from "react-icons/gi";

import {
  Chip,
  SpeedDial,
  SpeedDialAction,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Box } from "@mui/system";

import { useTranslate } from "src/utils/translateHelper";

import { SupportedLang } from "../../work-space";
import { getActions } from "./config";
import {
  ACTION_FAB_PROPS,
  BOX_SX,
  SPEED_DIAL_SX,
  getChipSx,
  getSpeedDialFabProps,
} from "./constants";

export interface MenuProps {
  code: string;
  language: SupportedLang;
  publicPage?: boolean;
}

const Menu: FC<MenuProps> = ({ code, language, publicPage }) => {
  const classes = tooltipRewrite();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [speedDial, setSpeedDial] = useState(false);
  const openSpeedDial = () => {
    setSpeedDial(true);
  };

  const closeSpeedDial = () => {
    setSpeedDial(false);
  };

  const speedDialFabProps = useMemo(
    () => getSpeedDialFabProps(speedDial),
    [speedDial]
  );
  const actions = useMemo(
    () =>
      getActions({
        code,
        language,
      }),
    [code, language]
  );
  const translate = useTranslate();

  const isContentExist = !publicPage && isDesktop;

  return (
    <Box
      className="tourBottombarMenu"
      sx={{ width: "50px", display: !isDesktop ? "none" : "flex" }}
    >
      {isContentExist && (
        <SpeedDial
          aria-describedby="popper"
          ariaLabel="SpeedDial menu bottom"
          open={speedDial}
          onClose={closeSpeedDial}
          onOpen={openSpeedDial}
          FabProps={speedDialFabProps}
          sx={SPEED_DIAL_SX}
          direction="up"
          icon={
            <GiSave
              size="20px"
              style={{ color: speedDial ? "#43D4DD" : "#b3b3b3" }}
            />
          }
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              TooltipClasses={{ tooltip: classes.tooltip }}
              tooltipTitle={
                <Box sx={BOX_SX}>
                  <Chip
                    label={
                      action.isPublic
                        ? translate("public")
                        : translate("private")
                    }
                    sx={getChipSx(action)}
                  />
                  <Typography variant="subtitle2">
                    {translate(action.name)}
                  </Typography>
                </Box>
              }
              FabProps={ACTION_FAB_PROPS}
            />
          ))}
        </SpeedDial>
      )}
    </Box>
  );
};

const tooltipRewrite = makeStyles(() => ({
  tooltip: {
    color: "#364954",
    background: "transparent",
  },
}));

export default Menu;
