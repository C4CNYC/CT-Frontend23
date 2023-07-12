import SearchOutlined from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/system/Stack";

import { SetFilterType, useFilters } from "@hooks";
import { ITaskSearchParams } from "src/redux/services/interfaces/task.interface";
import { useGetTasksQuery } from "src/redux/services/manager/tasks-manager";

import SkeletonTaskFilter from "./skeletonTaskFilter";

interface Props {
  filters: ITaskSearchParams;
  setFilter: SetFilterType;
}

export default function FilterTasks({
  filters,
  setFilter,
}: Props): React.ReactElement {
  const { filters: taskFilters } = useFilters<ITaskSearchParams>({
    take: 50,
    name: "",
  });

  const { isLoading } = useGetTasksQuery(taskFilters);

  if (isLoading) return <SkeletonTaskFilter />;

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
        <TextField
          sx={{
            width: { xs: "100%", sm: "100%", md: "260px", lg: "260px" },
          }}
          placeholder="Name"
          onChange={(event) => {
            setFilter("name", event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </>
  );
}
