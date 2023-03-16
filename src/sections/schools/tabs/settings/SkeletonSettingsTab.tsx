import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";

export default function SkeletonSettingsTab(): React.ReactElement {
  return (
    <>
      <Stack spacing={2}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="120px"
          sx={{ borderRadius: "16px" }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height="218px"
          sx={{ borderRadius: "16px" }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height="150px"
          sx={{ borderRadius: "16px" }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height="138px"
          sx={{ borderRadius: "16px" }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height="242px"
          sx={{ borderRadius: "16px" }}
          animation="wave"
        />
        <Stack>
          <Skeleton
            variant="rectangular"
            width="126px"
            height="36px"
            sx={{ borderRadius: "8px", ml: "auto", mt: 2, mb: 4 }}
            animation="wave"
          />
        </Stack>
      </Stack>
    </>
  );
}
