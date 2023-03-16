import { Skeleton } from "@mui/material";

export default function SkeletonSocialsTab(): React.ReactElement {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="178px"
        sx={{ borderRadius: "16px", mt: "24px" }}
        animation="wave"
      />
    </>
  );
}
