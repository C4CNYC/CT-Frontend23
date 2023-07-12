import { Iconify, IconifyProps } from "../iconify";

// ----------------------------------------------------------------------

interface Props {
  icon?: IconifyProps; // Right icon
  isRTL?: boolean;
}

export function LeftIcon({
  icon = "eva:arrow-ios-forward-fill",
  isRTL,
}: Props): React.ReactElement | null {
  return (
    <Iconify
      icon={icon}
      sx={{
        width: 20,
        height: 20,
        transform: " scaleX(-1)",
        ...(isRTL && {
          transform: " scaleX(1)",
        }),
      }}
    />
  );
}

export function RightIcon({
  icon = "eva:arrow-ios-forward-fill",
  isRTL,
}: Props): React.ReactElement | null {
  return (
    <Iconify
      icon={icon}
      sx={{
        width: 20,
        height: 20,
        ...(isRTL && {
          transform: " scaleX(-1)",
        }),
      }}
    />
  );
}
