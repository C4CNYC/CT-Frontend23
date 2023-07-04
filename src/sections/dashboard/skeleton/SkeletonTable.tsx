import { Skeleton } from "@mui/material";

export default function SkeletonTable(): React.ReactElement {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "80vh",
        borderRadius: "20px",
        mb: "20px",
      }}
    />
  );
}
