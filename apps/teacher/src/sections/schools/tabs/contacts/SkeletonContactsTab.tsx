import { Skeleton } from "@mui/material";

export default function SkeletonContactsTab(): React.ReactElement {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="680px"
        sx={{ borderRadius: "16px", mt: "32px" }}
        animation="wave"
      />
    </>
  );
}
