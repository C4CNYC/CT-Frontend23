import { useRouter } from "next/router";
import { useEffect } from "react";

import { Autocomplete, Skeleton, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";

import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { useGetMySchoolsQuery } from "src/redux/services/manager/schools-manager";

export default function FilterCourses(): React.ReactElement {
  const { push } = useRouter();
  const { data, isLoading } = useGetMySchoolsQuery({});

  useEffect(() => {
    if (data) {
      push(
        `${MANAGER_PATH_DASHBOARD.school.assignments}?${new URLSearchParams({
          schoolId: data.data[0].id ?? "",
        })}`,
        undefined,
        { shallow: true }
      );
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <Skeleton width={300} height={56} variant="rounded" sx={{ mb: 4 }} />
    );
  }

  return (
    <>
      <Stack
        spacing={2}
        sx={{ mb: 4 }}
        alignItems="center"
        direction={{
          xs: "column",
          sm: "row",
        }}
      >
        <Autocomplete
          disablePortal
          loading={isLoading}
          defaultValue={data?.data[0]}
          id="combo-box-demo"
          options={data?.data ?? []}
          getOptionLabel={(option) => option.name}
          onChange={(e, newValue) => {
            push(
              `${
                MANAGER_PATH_DASHBOARD.school.assignments
              }?${new URLSearchParams({
                schoolId: newValue ? newValue.id : "",
              })}`,
              undefined,
              { shallow: true }
            );
          }}
          sx={{ width: { xs: "100%", sm: 300 } }}
          renderInput={(params) => <TextField {...params} label="Shcool" />}
        />
      </Stack>
    </>
  );
}
