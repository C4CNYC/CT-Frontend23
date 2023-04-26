import { Skeleton } from "@mui/material";

export const SkeletonSidebarUser = (): React.ReactElement => {
  return (
    <Skeleton
      animation="wave"
      variant="rounded"
      sx={{ width: "222px", height: "50px", m: "8px 16px 8px 0" }}
    />
  );
};
