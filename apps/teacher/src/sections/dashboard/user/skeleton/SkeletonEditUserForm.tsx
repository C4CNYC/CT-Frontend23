import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SkeletonEditUserForm(): React.ReactElement {
  return (
    <>
      <Stack display="flex" direction="row" spacing={3}>
        <Stack>
          <Skeleton
            variant="rounded"
            width={400}
            height={450}
            sx={{ pt: 10, pb: 5, px: 3 }}
          />
        </Stack>
        <Stack display="flex" direction="column">
          <Stack>
            <Skeleton variant="rounded" width={704} height={60} />
          </Stack>
          <Stack spacing={3} display="flex" direction="row" mt="20px">
            <Skeleton variant="rounded" width={340} height={60} />
            <Skeleton variant="rounded" width={340} height={60} />
          </Stack>
          <Stack spacing={3} display="flex" direction="row" mt="20px">
            <Skeleton variant="rounded" width={340} height={60} />
            <Skeleton variant="rounded" width={340} height={60} />
          </Stack>
          <Stack spacing={3} display="flex" direction="row" mt="20px">
            <Skeleton variant="rounded" width={340} height={60} />
            <Skeleton variant="rounded" width={340} height={60} />
          </Stack>
          <Stack mt="20px">
            <Skeleton variant="rounded" width={704} height={120} />
          </Stack>
          <Stack mt="20px" alignItems="flex-end">
            <Skeleton variant="rounded" width={170} height={45} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
