import { Box, Typography } from "@mui/material";

interface Props {
  count: number;
  sx?: Record<string, any>;
  sxText?: Record<string, any>;
}

export default function TribesCounter({
  count,
  sx,
  sxText,
}: Props): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alighItems: "center",
        background: "#DFE3E8",
        borderRadius: 1,
        width: "24px",
        height: "22px",
        ml: 1,
        ...sx,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 700, ...sxText }}>
        {count}
      </Typography>
    </Box>
  );
}
