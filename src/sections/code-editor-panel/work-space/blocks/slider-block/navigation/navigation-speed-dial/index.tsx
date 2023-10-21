import { type FC, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { BsLightningCharge } from "react-icons/bs";

import { Badge, SpeedDial, SpeedDialAction, useTheme } from "@mui/material";

import { useSelector } from "src/redux/store";
import { setChatVisible } from "src/redux/slices/chat-handler";

import { getActions } from "./config";
import {
  BADGE_SX,
  SPEED_DIAL_ACTION_FAB_PROPS,
  getSpeedDealSx,
  getSpeedDialFabProps
} from "./constants"

interface NavigationSpeedDialProps {
  stepHasValidation: boolean;
}

const NavigationSpeedDial: FC<NavigationSpeedDialProps> = ({
  stepHasValidation,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const isChatVisible = useSelector((state) => state.chatHandler.isChatVisible)
  const onToggleChat = useCallback(() => {
    dispatch(setChatVisible(!isChatVisible));
  }, [isChatVisible])

  const actions = useMemo(() => getActions(onToggleChat), [onToggleChat]);
  const speedDialFabProps = useMemo(() => getSpeedDialFabProps(stepHasValidation), [stepHasValidation]);
  const speedDialSx = useMemo(() => getSpeedDealSx(theme), [theme])

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      FabProps={speedDialFabProps}
      sx={speedDialSx}
      icon={
        <Badge
          sx={BADGE_SX}
          color="secondary"
          variant="dot"
        >
          <BsLightningCharge size="30px" />
        </Badge>
      }
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
          tooltipPlacement="top-start"
          FabProps={SPEED_DIAL_ACTION_FAB_PROPS}
        />
      ))}
    </SpeedDial>
  );
}

export default NavigationSpeedDial;
