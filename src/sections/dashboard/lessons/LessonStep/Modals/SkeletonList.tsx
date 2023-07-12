import { Box, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonList(): React.ReactElement {
  return (
    <Box sx={{ p: 2 }}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ width: "50%", height: "24px", mb: "8px" }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ width: "100%", height: "58px", my: "16px" }}
      />
      <Stack sx={{ py: 1 }} spacing={3}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "100%", height: "82px" }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "100%", height: "82px" }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "100%", height: "82px" }}
        />
      </Stack>
    </Box>
  );
}
