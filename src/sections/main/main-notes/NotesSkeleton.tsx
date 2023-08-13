import { Skeleton, Stack } from "@mui/material";

export default function NotesSkeletonList(): React.ReactElement {
  return (
    <Stack
      sx={{
        ml: { lg: 2 },
        mt: { xs: 2, sm: 2, md: 2, lg: 0 },
        minWidth: { lg: "300px" },
        px: { sm: 1, md: 1, lg: 0 },
      }}
    >
      <Skeleton variant="rounded" height="30px" width="130px" sx={{ mb: 1 }} />
      <Skeleton variant="rounded" height="99px" sx={{ mb: 2 }} />
      <Skeleton variant="rounded" height="99px" sx={{ mb: 2 }} />
      <Skeleton variant="rounded" height="34px" width="60px" />
    </Stack>
  );
}
