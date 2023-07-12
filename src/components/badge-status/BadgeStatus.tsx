import { useTheme } from "@mui/material/styles";

import { BadgeStatusProps } from "./types";
import { StyledBadgeStatus } from "./styles";

export function BadgeStatus({
  size = "medium",
  status = "offline",
  sx,
}: BadgeStatusProps): React.ReactElement | null {
  const theme = useTheme();

  return (
    <StyledBadgeStatus ownerState={{ status, size }} sx={sx} theme={theme} />
  );
}
