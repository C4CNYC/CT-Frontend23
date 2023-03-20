import { Grid, Skeleton } from "@mui/material";

export default function SkeletonProfileOrg(): React.ReactElement {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="356px"
            sx={{
              borderRadius: "8px",
              ml: "auto",
              mt: { xs: 0, md: 2 },
              mb: { xs: 0, md: 4 },
            }}
            animation="wave"
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="356px"
            sx={{
              borderRadius: "8px",
              ml: "auto",
              mt: { xs: 0, md: 2 },
              mb: { xs: 0, md: 4 },
            }}
            animation="wave"
          />
        </Grid>
      </Grid>
    </>
  );
}
