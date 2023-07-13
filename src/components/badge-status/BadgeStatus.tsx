// @mui
import { useTheme } from "@mui/material/styles";

//
import { StyledBadgeStatus } from "./styles";
import { BadgeStatusProps } from "./types";

// ----------------------------------------------------------------------

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
