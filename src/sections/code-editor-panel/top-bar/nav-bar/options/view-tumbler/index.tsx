import { type FC } from "react";

import { IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { Iconify } from "@components";

interface ViewToomblerProps {
  isFullScreenView: boolean;
  isColumnHidden: boolean;
  onChangeColumnVisability: (value: boolean) => void;
  onHanldeFullScreen: () => void;
}

const ViewTumbler: FC<ViewToomblerProps> = ({
  isFullScreenView,
  isColumnHidden,
  onChangeColumnVisability,
  onHanldeFullScreen,
}) => {
  const columnIcon = isColumnHidden ? "tabler:columns-3" : "tabler:columns-1";
  const screenViewIcon = isFullScreenView
    ? "la:compress-arrows-alt"
    : "mdi:arrow-expand-all";

  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor="#FBDD3F"
      borderRadius="50px"
      padding="0 12px"
      height="41px"
    >
      <Tooltip
        title={
          <>
            <Typography variant="subtitle2">Focus Mode:</Typography>
            <Typography variant="inherit" width={170}>
              More space for the code editor. Compress the slides & browser.
            </Typography>
          </>
        }
      >
        <IconButton
          onClick={() => {
            onChangeColumnVisability(!isColumnHidden);
          }}
        >
          <Iconify icon={columnIcon} />
        </IconButton>
      </Tooltip>

      <IconButton onClick={onHanldeFullScreen}>
        <Iconify icon={screenViewIcon} />
      </IconButton>
    </Box>
  );
};

export default ViewTumbler;
