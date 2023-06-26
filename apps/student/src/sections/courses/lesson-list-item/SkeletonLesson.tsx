import { Skeleton } from "@mui/material";

export default function SkeletonLesson(): React.ReactElement {
  return (
    <Skeleton
      sx={{
        display: "flex",
        flexBasis: { sm: "100%", md: "48%" },
        height: "217px",
      }}
      animation="wave"
      variant="rounded"
    />
  );
}
