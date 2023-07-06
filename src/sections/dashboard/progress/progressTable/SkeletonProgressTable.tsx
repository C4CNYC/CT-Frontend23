import { Skeleton } from "@mui/material";

export function SkeletonProgressTable(): React.ReactElement {
  return (
    <Skeleton
      animation="wave"
      variant="rounded"
      sx={{
        width: "100%",
        height: "42px",
        mx: "10px",
      }}
    />
  );
}

export function SkeletonProgressTableRow(): React.ReactElement {
  return (
    <Skeleton
      animation="wave"
      variant="rounded"
      sx={{
        width: "100%",
        height: "36px",
        mt: "8px",
      }}
    />
  );
}
