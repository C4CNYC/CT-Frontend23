import { Box, Skeleton } from "@mui/material";

export default function SkeletonContentCode(): React.ReactElement {
  return (
    <>
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ width: "100%", height: "48px", mb: 1 }}
      />
      <Box sx={{ display: "flex" }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "50%", mr: 1, height: "100vh" }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "50%", height: "100vh" }}
        />
      </Box>
    </>
  );
}
