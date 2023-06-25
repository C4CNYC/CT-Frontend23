// @mui
import { Box, Grid, GridProps, Skeleton } from "@mui/material";

// ----------------------------------------------------------------------

export function SkeletonPostItem({
  ...other
}: GridProps): React.ReactElement | null {
  return (
    <Grid item xs={12} sm={6} md={3} {...other}>
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ height: 200, borderRadius: 2 }}
      />
      <Box sx={{ display: "flex", mt: 1.5 }}>
        <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
        <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      </Box>
    </Grid>
  );
}
