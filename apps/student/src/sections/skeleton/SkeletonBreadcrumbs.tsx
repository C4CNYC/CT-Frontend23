import { Box, Skeleton } from "@mui/material";

export default function SkeletonBreadcrumbs(): React.ReactElement {
  return (
    <Box>
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{
          width: "120px",
          height: "26px",
          mb: "18px",
        }}
      />
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{
          width: "200px",
          height: "16px",
          mb: "50px",
        }}
      />
    </Box>
  );
}
