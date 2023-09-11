import { Box, Skeleton } from "@mui/material";

export function SkeletonBreadcrumbs(): React.ReactElement {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: "40px",
          height: "26px",
          borderRadius: "8px",
        }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: "4px",
          height: "4px",
        }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: "60px",
          height: "26px",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
}
