import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";

export default function SkeletonSchoolDetailsDrawer(): React.ReactElement {
  return (
    <>
      <Stack spacing={1} display="flex" direction="row" mt="20px" ml="20px">
        <Skeleton
          variant="circular"
          width="40px"
          height="40px"
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="80%"
          height="40px"
          sx={{
            borderRadius: "8px",
            ml: "auto",
          }}
          animation="wave"
        />
      </Stack>
    </>
  );
}
