import { Box, Skeleton, Stack } from "@mui/material";

export default function SkeletonCustomizationOrg(): React.ReactElement {
  return (
    <>
      <Box
        gap={2.5}
        display="grid"
        justifyItems={{ xs: "center", sm: "start" }}
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="253px"
          height="92px"
          sx={{ borderRadius: "16px", mt: "16px" }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="253px"
          height="92px"
          sx={{ borderRadius: "16px", mt: "16px" }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="253px"
          height="92px"
          sx={{ borderRadius: "16px", mt: "16px" }}
          animation="wave"
        />
      </Box>
      <Box>
        <Skeleton
          variant="rectangular"
          width="35%"
          height="28px"
          sx={{ borderRadius: "16px", mt: "32px", mb: "16px" }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height="128px"
          sx={{ borderRadius: "16px", mb: "16px" }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="35%"
          height="28px"
          sx={{ borderRadius: "16px", mt: "32px", mb: "16px" }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100px"
          sx={{ borderRadius: "16px", mb: "16px" }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="35%"
          height="28px"
          sx={{ borderRadius: "16px", mt: "32px", mb: "16px" }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height="146px"
          sx={{ borderRadius: "16px", mb: "16px" }}
          animation="wave"
        />
        <Stack>
          <Skeleton
            variant="rectangular"
            width="126px"
            height="36px"
            sx={{ borderRadius: "8px", ml: "auto", mt: 4 }}
            animation="wave"
          />
        </Stack>
      </Box>
    </>
  );
}
