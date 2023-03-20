import { Box, Skeleton } from "@mui/material";

export default function SkeletonCourses(): React.ReactElement {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      }}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          maxWidth: "368px",
          height: "395px",
          borderRadius: "16px",
        }}
      />
    </Box>
  );
}
