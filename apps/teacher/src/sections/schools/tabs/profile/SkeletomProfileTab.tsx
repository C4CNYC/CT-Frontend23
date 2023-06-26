import { Grid, Skeleton, Stack } from "@mui/material";

export default function SkeletonProfileTab(): React.ReactElement {
  return (
    <Grid
      container
      alignItems="start"
      justifyContent="space-between"
      spacing={3}
    >
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="106px"
            sx={{ borderRadius: "16px" }}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height="274px"
            sx={{ mt: "24px", borderRadius: "16px" }}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100px"
            sx={{ mt: "24px", borderRadius: "16px" }}
            animation="wave"
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{ borderRadius: "16px", height: { xs: "503px", md: "640px" } }}
          animation="wave"
        />
      </Grid>
    </Grid>
  );
}
