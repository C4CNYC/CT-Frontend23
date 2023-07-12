import * as React from "react";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export function SkeletonCoursesItem() {
  return (
    <Stack display="flex" direction="row">
      <Stack spacing={2} mt="30px" ml="100px">
        <Skeleton
          variant="text"
          sx={{ fontSize: "24px", mb: "10px" }}
          width={200}
          height={95}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={500}
          height={58}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={500}
          height={58}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={500}
          height={58}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={500}
          height={58}
          animation="wave"
        />
      </Stack>
      <Skeleton
        variant="rounded"
        width="300px"
        height="300px"
        animation="wave"
        sx={{ mt: "100px", ml: "300px" }}
      />
    </Stack>
  );
}
