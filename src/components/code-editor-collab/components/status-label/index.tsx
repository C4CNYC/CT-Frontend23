import { type FC } from "react";

import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

export enum RoomStatus {
  Inactive = 0,
  Active = 1,
}

const OFFLINE_MESSAGE = 'User is offline';

interface StatusLabelProps {
  status: RoomStatus
}

const StatusLabel: FC<StatusLabelProps> = ({ status }) => {
  if (status === RoomStatus.Active) {
    return null;
  }

  return (
    <Stack sx={STACK_SX}>
      <Typography variant="body1" sx={STACK_SX}>
        {OFFLINE_MESSAGE}
      </Typography>
    </Stack>
  )
}

const STACK_SX = {
  position: "absolute",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex: 1,
  color: "#364954",
  backdropFilter: "invert(.3)",
  background: "rgba(255, 255, 255, .1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

export default StatusLabel;
