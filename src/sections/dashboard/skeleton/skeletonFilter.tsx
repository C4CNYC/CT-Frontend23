import { Skeleton } from "@mui/material";

export default function SkeletonFilter(): React.ReactElement {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        mr: "16px",
        width: "260px",
        height: "56px",
        borderRadius: "16px",
        mb: "32px",
      }}
    />
  );
}
