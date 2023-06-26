import { Skeleton, Stack } from "@mui/material";

export default function SchoolFiltersSkeleton(): React.ReactElement {
  return (
    <Stack direction="row" sx={{ padding: "24px 20px" }}>
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ width: "100%", maxWidth: "235px", mr: "16px", height: "56px" }}
      />
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ width: "100%", mr: "16px", height: "56px" }}
      />
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ width: "92px", ml: "16px", height: "56px" }}
      />
    </Stack>
  );
}
