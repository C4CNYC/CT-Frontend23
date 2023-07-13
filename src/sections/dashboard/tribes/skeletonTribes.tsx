import { Box, Container, Skeleton } from "@mui/material";

import { useSettingsContext } from "@components";

export default function SkeletonTribes(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <Box sx={{ mb: "40px" }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            width: "90px",
            height: "25px",
            borderRadius: "8px",
            mb: "12px",
          }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            width: "150px",
            height: "20px",
            mb: "6px",
            borderRadius: "8px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "flex-start",
            sm: "space-between",
            md: "space-between",
          },
          alignItems: "baseline",
          flexWrap: {
            xs: "wrap-reverse",
            sm: "wrap-reverse",
            md: "nowrap",
          },
          mt: { xs: "-20px", sm: "20px", md: 0 },
          gap: { xs: 2, sm: 2, md: 0 },
        }}
      >
        <Box sx={{ display: "flex", gap: "40px" }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="96px"
            height="48px"
            sx={{ borderRadius: "8px" }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="130px"
            height="48px"
            sx={{ borderRadius: "8px" }}
          />
        </Box>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="195px"
          height="36px"
          sx={{ borderRadius: "50px" }}
        />
      </Box>
      <Box
        sx={{
          mt: {
            xs: "25px",
            sm: "25px",
            md: "45px",
          },
          display: "flex",
          justifyContent: {
            xs: "flex-start",
            sm: "space-between",
            md: "space-between",
          },
          alignItems: "center",
          flexWrap: {
            xs: "wrap",
            sm: "wrap",
            md: "nowrap",
          },
          gap: {
            xs: 2,
            sm: 2,
            md: 0,
          },
        }}
      >
        <Skeleton
          width="253px"
          height="40px"
          variant="rectangular"
          animation="wave"
          sx={{ borderRadius: "8px" }}
        />
        <Box sx={{ display: "flex" }}>
          <Skeleton
            width="68px"
            height="36px"
            variant="rectangular"
            animation="wave"
            sx={{ borderRadius: "8px" }}
          />
          <Skeleton
            width="73px"
            height="36px"
            variant="rectangular"
            animation="wave"
            sx={{ borderRadius: "8px", ml: "46px" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          pt: { xs: "20px", sm: "35px", md: "45px" },
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            sm: "flex-start",
            md: "flex-start",
            lg: "space-between",
          },
          gap: { xs: 2, sm: 2, md: 3 },
        }}
      >
        <Skeleton
          width="344px"
          height="498px"
          variant="rectangular"
          animation="wave"
          sx={{ borderRadius: "16px" }}
        />
      </Box>
    </Container>
  );
}
