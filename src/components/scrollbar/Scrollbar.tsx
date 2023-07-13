import { memo } from "react";

// @mui
import { Box } from "@mui/material";

//
import { StyledRootScrollbar, StyledScrollbar } from "./styles";
import { ScrollbarProps } from "./types";

// ----------------------------------------------------------------------
/* eslint-disable react/display-name */
export const Scrollbar = memo(
  ({ children, sx, ...other }: ScrollbarProps): React.ReactElement | null => {
    const userAgent =
      typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );

    if (isMobile) {
      return (
        <Box sx={{ overflowX: "auto", ...sx }} {...other}>
          {children}
        </Box>
      );
    }

    return (
      <StyledRootScrollbar>
        <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    );
  }
);
