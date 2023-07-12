// @mui
import { Card, SxProps, Typography } from "@mui/material";
import { Theme, alpha } from "@mui/material/styles";

//
import { ItemProps } from "../types";

// ----------------------------------------------------------------------

interface Props {
  node: ItemProps;
  sx?: SxProps<Theme>;
}

export default function SimpleNode({
  node,
  sx,
}: Props): React.ReactElement | null {
  return (
    <Card
      sx={{
        p: 2,
        boxShadow: 0,
        borderRadius: 1.5,
        display: "inline-flex",
        textTransform: "capitalize",
        color: (theme) =>
          theme.palette.mode === "light" ? "primary.darker" : "primary.lighter",
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
        border: (theme) =>
          `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
        ...sx,
      }}
    >
      <Typography variant="subtitle2">{node.name}</Typography>
    </Card>
  );
}
