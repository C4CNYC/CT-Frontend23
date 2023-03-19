import { Skeleton, Stack } from "@mui/material";

export default function SkeletonTaskFilter(): React.ReactElement {
  return (
    <Stack direction="row" sx={{ mb: "32px" }}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          mr: "16px",
          width: "260px",
          height: "56px",
          borderRadius: "16px",
        }}
      />
    </Stack>
  );
}
