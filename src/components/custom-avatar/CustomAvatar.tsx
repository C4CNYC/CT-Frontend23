import { forwardRef } from "react";

import { Avatar, Badge } from "@mui/material";
import { useTheme } from "@mui/material/styles";

//
import { CustomAvatarProps } from "./types";

// ----------------------------------------------------------------------

const getCharAtName = (name: string): string => name?.charAt(0).toUpperCase();

const getColorByName = (name: string): string => {
  if (["A", "N", "H", "L", "Q"].includes(getCharAtName(name))) return "primary";
  if (["F", "G", "T", "I", "J"].includes(getCharAtName(name))) return "info";
  if (["K", "D", "Y", "B", "O"].includes(getCharAtName(name))) return "success";
  if (["P", "E", "R", "S", "U"].includes(getCharAtName(name))) return "warning";
  if (["V", "W", "X", "M", "Z"].includes(getCharAtName(name))) return "error";
  return "default";
};

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
export const CustomAvatar = forwardRef<HTMLDivElement, CustomAvatarProps>(
  ({ color, name = "", BadgeProps, children, sx, ...other }, ref) => {
    const theme = useTheme();

    const charAtName = getCharAtName(name);

    const colorByName = getColorByName(name);

    const colr = color ?? colorByName;

    const isEmoji = other.src && !(other.src?.includes("https://") ||
      other.src?.includes("http://") ||
      other.src?.includes("data:image"));

    const avatar = isEmoji ? other.src : charAtName;

    const renderContent =
      colr === "default" ? (
        <Avatar ref={ref} sx={sx} src={other.src} {...other}>
          {name && avatar}
          {children}
        </Avatar>
      ) : (
        <Avatar
          ref={ref}
          sx={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            color: theme?.palette[colr]?.contrastText,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            backgroundColor: theme?.palette[colr]?.main,
            fontWeight: theme.typography.fontWeightMedium,
            ...sx,
          }}
          src={other.src}
          {...other}
        >
          {name && avatar}
          {children}
        </Avatar>
      );

    return BadgeProps ? (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        {...BadgeProps}
      >
        {renderContent}
      </Badge>
    ) : (
      renderContent
    );
  }
);
