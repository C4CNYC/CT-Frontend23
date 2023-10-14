import { type FC } from "react"
import { type TooltipRenderProps } from "react-joyride";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { BOX_CONTENT_SX, BTN_BACK_SX, ICON_BTN_SX, NEXT_BTN_SX, PAPER_SX, getBoxActionsSx, getBoxSx } from "./constants";

const TooltipTourCodePanel: FC<TooltipRenderProps> = ({
  index,
  step,
  size,
  backProps,
  primaryProps,
  tooltipProps,
  skipProps,
}) => {
  return (
    <Paper elevation={6} {...tooltipProps} sx={PAPER_SX}>
      <Box sx={getBoxSx(step.title)}>
        {step.title && <Typography variant="h5">{step.title}</Typography>}

        {index + 1 !== size && (
          <IconButton {...skipProps} sx={ICON_BTN_SX}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={BOX_CONTENT_SX}>{step.content}</Box>

      <Box sx={getBoxActionsSx(index)}>
        {index > 0 && (
          <Button {...backProps} sx={BTN_BACK_SX}>
            Back

            <Box id="back" />
          </Button>
        )}

        <Typography variant="subtitle2" sx={{ pr: index === 0 ? 10 : 0 }}>
          {index + 1}/{size}
        </Typography>

        {index + 1 < size && (
          <Button {...primaryProps} sx={NEXT_BTN_SX}>
            Next

            <Box id="next" />
          </Button>
        )}

        {index + 1 === size && (
          <Button {...skipProps}>
            Close

            <Box id="close" />
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default TooltipTourCodePanel;
