import { Box, Skeleton } from "@mui/material";

export default function SkeletonCourses(): React.ReactElement {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: "100%",
          maxWidth: "368px",
          height: "395px",
          borderRadius: "16px",
        }}
      />
    </Box>
  );
}
