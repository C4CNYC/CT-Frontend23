import { Box, Skeleton } from "@mui/material";

export default function TeacherSkeletonPanel(): React.ReactElement {
  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: "30px",
          py: "30px",
        }}
      >
        <Skeleton variant="rounded" animation="wave" width={220} height={50} />
        <Skeleton variant="rounded" animation="wave" width={60} height={40} />

        <Skeleton variant="rounded" animation="wave" width={30} height={30} />
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ gap: 1 }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "400px", height: "calc(100vh - 100px)" }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "1200px", height: "calc(100vh - 100px)" }}
        />
        <Box mb="400px">
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              width: "70px",
              height: "calc(70vh - 50px)",
              borderRadius: "15px 0px 0px 15px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
