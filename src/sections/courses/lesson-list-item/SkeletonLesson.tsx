import { Skeleton } from "@mui/material";

export default function SkeletonLesson(): React.ReactElement {
  return (
    <Skeleton
      sx={{
        display: "flex",
        flexBasis: { sm: "100%", md: "48%" },
        height: "232px",
      }}
      animation="wave"
      variant="rounded"
    />
  );
}
