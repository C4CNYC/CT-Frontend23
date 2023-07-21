import { forwardRef } from "react";

// @mui
import { IconButton, Stack, StackProps } from "@mui/material";
import { alpha } from "@mui/material/styles";

// components
import { Iconify } from "../iconify";

// ----------------------------------------------------------------------

export interface IncrementerButtonProps extends StackProps {
  name?: string;
  quantity: number;
  disabledIncrease?: boolean;
  disabledDecrease?: boolean;
  onIncrease: VoidFunction;
  onDecrease: VoidFunction;
}

// eslint-disable-next-line react/display-name
const IncrementerButton = forwardRef<HTMLDivElement, IncrementerButtonProps>(
  (
    {
      quantity,
      onIncrease,
      onDecrease,
      disabledIncrease,
      disabledDecrease,
      sx,
      ...other
    },
    ref
  ) => (
    <Stack
      ref={ref}
      flexShrink={0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        mb: 0.5,
        py: 0.5,
        px: 0.75,
        width: 96,
        borderRadius: 1,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        ...sx,
      }}
      {...other}
    >
      <IconButton
        size="small"
        color="inherit"
        onClick={onDecrease}
        disabled={disabledDecrease}
        sx={{ color: "text.secondary" }}
      >
        <Iconify icon="eva:minus-fill" width={16} />
      </IconButton>

      {quantity}

      <IconButton
        size="small"
        color="inherit"
        onClick={onIncrease}
        disabled={disabledIncrease}
        sx={{ color: "text.secondary" }}
      >
        <Iconify icon="eva:plus-fill" width={16} />
      </IconButton>
    </Stack>
  )
);

export default IncrementerButton;
