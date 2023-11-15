import { Box, Skeleton, useMediaQuery, useTheme } from "@mui/material";

export default function SkeletonCodePanel(): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <CPTopBarSkeleton />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: 1, px: 1 }}
      >
        <Skeleton
          sx={{ width: { md: 0, lg: "100%" }, height: "calc(100vh - 105px)" }}
          variant="rounded"
          animation="wave"
        />
        <Skeleton
          sx={{
            width: "100%",
            height: "calc(100vh - 105px)",
          }}
          variant="rounded"
          animation="wave"
        />
        <Skeleton
          sx={{ width: { md: 0, lg: "100%" }, height: "calc(100vh - 105px)" }}
          variant="rounded"
          animation="wave"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "55px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          px: "40px",
        }}
      >
        <Skeleton
          sx={{
            width: { xs: "20px", sm: "200px", md: "200px" },
            height: { sm: "20px", md: "36px" },
          }}
          variant="rectangular"
          animation="wave"
        />
        <Box
          sx={{
            width: "65%",
            display: "flex",
            justifyContent: isDesktop ? "space-between" : "flex-end",
            alignItems: "center",
          }}
        >
          <Skeleton
            sx={{
              display: isDesktop ? "block" : "none",
              width: "100%",
              height: "16px",
            }}
            variant="rounded"
            animation="wave"
          />

          <Skeleton
            sx={{
              width: "20px",
              height: "20px",
              ml: { sm: "0px", md: "20px" },
            }}
            variant="rectangular"
            animation="wave"
          />
        </Box>
      </Box>
    </Box>
  );
}
export const CPTopBarSkeleton = (): React.ReactElement => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  return (
    <Box
      sx={{
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: isDesktop ? "space-between" : "",
        alignItems: "center",
        px: "40px",
      }}
    >
      <Skeleton
        sx={{
          width: { xs: "20px", sm: "20px", md: "20px", lg: "197px" },
          height: { xs: "20px", sm: "20px", md: "20px", lg: "33px" },
        }}
        variant="rounded"
        animation="wave"
      />
      <Skeleton
        sx={{
          display: isDesktop ? "none" : "block",
          margin: isDesktop ? "0" : "0 auto",
          width: { xs: "198px", sm: "248px", md: "248px", lg: "0px" },
          height: { xs: "39px", sm: "39px", md: "39px", lg: "0px" },
          borderRadius: "15px 15px 0 0 ",
        }}
        variant="rectangular"
        animation="wave"
      />
      {isDesktop ? (
        <>
          <Skeleton
            sx={{
              width: "237px",
              height: "40px",
              ml: "141px",
              borderRadius: "35px",
            }}
            variant="rounded"
            animation="wave"
          />
          <Skeleton
            sx={{
              display: isDesktop ? "block" : "none",
              width: "328px",
              height: "48px",
            }}
            variant="rounded"
            animation="wave"
          />
        </>
      ) : null}
    </Box>
  );
};
