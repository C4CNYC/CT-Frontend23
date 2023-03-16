import { Box, Skeleton } from "@mui/material";

export default function SkeletonContentMulti(): React.ReactElement {
  return (
    <>
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ width: "100%", height: "48px", mb: 1 }}
      />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "60%", mr: 1 }}>
          <Box sx={{ height: "140px", p: "15px", width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "83px", height: "30px" }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "124px", height: "30px" }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "83px", height: "30px" }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "165px", height: "30px" }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "124px", height: "30px" }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "30px", height: "30px" }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "30px", height: "30px" }}
                />
              </Box>
              <Box>
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "65px", height: "30px" }}
                />
              </Box>
            </Box>
          </Box>
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: "100%", height: "100vh" }}
          />
        </Box>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "40%", height: "100vh" }}
        />
      </Box>
    </>
  );
}
