import { Skeleton } from "@mui/material";

export default function SkeletonModule(): React.ReactElement {
  return (
    <Skeleton
      sx={{
        display: "flex",
        flexBasis: { sm: "100%", md: "48%" },
        height: "235px",
      }}
      animation="wave"
      variant="rounded"
    />
  );
}
