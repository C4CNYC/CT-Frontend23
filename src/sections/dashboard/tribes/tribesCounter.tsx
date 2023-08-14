import { Box, Typography } from "@mui/material";

interface ITribesCounterProps {
  count: number;
  sx?: Record<string, unknown>;
  sxText?: Record<string, unknown>;
}

export default function TribesCounter({
  count,
  sx,
  sxText,
}: ITribesCounterProps): React.ReactElement {
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
