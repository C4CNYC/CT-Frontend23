import { Box, Skeleton, Stack } from "@mui/material";

export default function CreateClassSkeleton(): React.ReactElement {
  return (
    <Stack>
      <Skeleton
        variant="rounded"
        sx={{ width: "100%", height: "400px", mb: 3 }}
      />
      <Skeleton
        variant="rounded"
        sx={{ height: "32px", width: "100px", ml: 3 }}
      />
      <Box
        sx={{
          gap: 2,
          pt: 3,
          pb: 2,
          px: 3,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(3, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(6, 1fr)",
          },
          maxHeight: "460px",
          overflow: "hidden",
        }}
      >
        {Array(18)
          .fill(null)
          .map(() => (
            <Skeleton
              variant="rounded"
              sx={{ height: { xs: "100px", sm: "130px" } }}
            />
          ))}
      </Box>
      <Stack
        direction="row"
        sx={{
          gap: 4,
          justifyContent: "flex-end",
          pr: { xs: 2, sm: 3, lg: 4 },
          pt: 2,
        }}
      >
        <Skeleton variant="rounded" sx={{ width: "94px", height: "48px" }} />
        <Skeleton variant="rounded" sx={{ width: "94px", height: "48px" }} />
      </Stack>
    </Stack>
  );
}
