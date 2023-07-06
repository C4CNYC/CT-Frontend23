import { Box, Skeleton } from "@mui/material";

export function SkeletonGalleryItem(): React.ReactElement {
  return (
    <Skeleton
      animation="wave"
      variant="rounded"
      sx={{
        minWidth: "276px",
        width: "100%",
        height: "489px",
      }}
    />
  );
}
export function SkeletonGalleryFilter(): React.ReactElement {
  return (
    <Skeleton
      animation="wave"
      variant="rounded"
      sx={{
        width: { xs: "100%", sm: "100%", md: "260px" },
        height: "56px",
        mb: "40px",
      }}
    />
  );
}
export function SkeletonGalleryBreadcrumbs(): React.ReactElement {
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
