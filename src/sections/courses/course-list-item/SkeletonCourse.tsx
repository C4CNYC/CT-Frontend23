import { Box, Skeleton } from "@mui/material";

export default function SkeletonCourse(): React.ReactElement {
  return (
    <Box>
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{
          width: "100%",
          height: { xs: "367px", sm: "365px", md: "362px" },
          borderRadius: "25px",
        }}
      />
    </Box>
  );
}
