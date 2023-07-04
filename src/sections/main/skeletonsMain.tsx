import { Skeleton } from "@mui/material";

export function SkeletonPendingTask(): React.ReactElement {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        mb: "15px",
        width: "100%",
        height: "60px",
        borderRadius: "16px",
      }}
    />
  );
}
export function SkeletonTriberListItem(): React.ReactElement {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        width: "100%",
        minWidth: "203px",
        height: "40px",
        borderRadius: "16px",
      }}
    />
  );
}
export function SkeletonProjectItem(): React.ReactElement {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        width: "330px",
        height: "497px",
        borderRadius: "16px",
      }}
    />
  );
}
