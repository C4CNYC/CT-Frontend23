import { Skeleton } from "@mui/material";

export default function SkeletonSchoolItem(): React.ReactElement {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        width: "315px",
        height: "120px",
        borderRadius: "16px",
      }}
    />
  );
}
