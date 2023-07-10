import { 
  Box, 
  Skeleton,
  Container, 
 } from "@mui/material";

export default function SkeletonCoursePage(): React.ReactElement {
  return (
    <Box
      sx={(theme) => ({
        minHeight: "100vh",
        width: "100%",
        [theme.breakpoints.down(1800)]: {
          pl: "10px",
          pt: "40px",
          pr: "10px",
        },
        [theme.breakpoints.up(1800)]: {
          pl: "165px",
          pt: "139px",
        },
        pb: "187px",
        background: "#ECF4FF",
      })}
    >
      <Container maxWidth={false} sx={{ maxWidth: "1922px" }}>
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{
            width: "100%",
            maxWidth: "147px",
            height: "24px",
            mb: "16px",
            ml: "8px",
            background: "#fff",
          }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{
            width: "100%",
            maxWidth: "247px",
            height: "32px",
            mb: "4px",
            background: "#fff",
          }}
        />
        <Box sx={{ width: "100%" }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{
              width: "100%",
              maxWidth: "447px",
              height: "26px",
              mb: "4px",
              background: "#fff",
            }}
          />
          <Box sx={{ mt: "32px", width: "100%", display: "flex", gap: "32px" }}>
            <Box sx={{ width: "100%", maxWidth: "740px" }}>
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={(theme) => ({
                  width: "100%",
                  height: "64px",
                  maxWidth: "646px",
                  ml: "8px",
                  background: "#fff",
                  borderRadius: "25px",
                  [theme.breakpoints.down(500)]: {
                    height: "76px",
                  },
                })}
              />
              <Box
                sx={(theme) => ({
                  mt: "80px",
                  ml: "-22px",
                  [theme.breakpoints.down(1250)]: {
                    ml: "0px",
                    mt: "40px",
                  },
                })}
              >
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{
                    width: "100%",
                    height: "250px",

                    mb: "20px",
                    background: "#fff",
                    borderRadius: "25px",
                  }}
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{
                    width: "100%",
                    height: "250px",

                    mb: "20px",
                    background: "#fff",
                    borderRadius: "25px",
                  }}
                />
              </Box>
            </Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={(theme) => ({
                width: "100%",
                maxWidth: "821px",
                height: "1095px",
                background: "#fff",
                borderRadius: "25px",
                [theme.breakpoints.down(1250)]: {
                  display: "none",
                },
              })}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
