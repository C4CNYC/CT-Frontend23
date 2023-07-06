import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";

interface IToolTipProps {
  continuous: boolean;
  index: number;
  size: number;
  step: Record<string, any>;
  backProps: Record<string, any>;
  closeProps: Record<string, any>;
  primaryProps: Record<string, any>;
  tooltipProps: Record<string, any>;
  skipProps: Record<string, any>;
}

export const TooltipTourCodePanel = ({
  index,
  step,
  size,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
  skipProps,
}: IToolTipProps) => {
  return (
    <Paper elevation={6} {...tooltipProps} sx={{ py: 2, px: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: step.title ? "space-between" : "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        {step.title && <Typography variant="h5">{step.title}</Typography>}
        {index + 1 !== size && (
          <IconButton {...skipProps} sx={{ mt: -2, mr: "-20px" }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <Box sx={{ maxWidth: "300px", py: 1 }}>{step.content}</Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: index === 0 ? "flex-end" : "space-between",
          alignItems: "center",
        }}
      >
        {index > 0 && (
          <Button {...backProps} sx={{ mr: 2 }}>
            Back
            <Box id="back" />
          </Button>
        )}
        <Typography variant="subtitle2" sx={{ pr: index === 0 ? 10 : 0 }}>
          {index + 1}/{size}
        </Typography>
        {index + 1 < size && (
          <Button {...primaryProps} sx={{ ml: 2 }}>
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
