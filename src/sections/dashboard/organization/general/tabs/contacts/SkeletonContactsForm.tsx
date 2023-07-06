import { Skeleton } from "@mui/material";

export default function SkeletonContactsForm(): React.ReactElement {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      sx={{
        borderRadius: "16px",
        mt: "24px",
        height: { xs: "455px", md: "346px" },
      }}
      animation="wave"
    />
  );
}
