import { Skeleton } from "@mui/material";

export function SkeletonFriends(): React.ReactElement {
  return (
    <Skeleton
      animation="wave"
      variant="rounded"
      sx={{
        width: "100%",
        maxHeight: { xs: "550px", sm: "470px", md: "440px", lg: "470px" },
        minHeight: { xs: "480px", sm: "450px", md: "420px", lg: "400px" },
      }}
    />
  );
}
