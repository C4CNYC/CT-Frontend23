import { Skeleton } from "@mui/material";

export default function SkeletonLesson(): React.ReactElement {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        width: "373px",
        height: "124px",
        borderRadius: "16px",
      }}
    />
  );
}
