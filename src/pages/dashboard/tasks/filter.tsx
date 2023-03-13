import { SetFilterType, useFilters } from "@hooks/useFilters";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Skeleton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/system/Stack";
import { ITaskSearchParams } from "src/redux/services/interfaces/task.interface";
import { useGetTasksQuery } from "src/redux/services/manager/tasks-manager";

interface Props {
  filters: ITaskSearchParams;
  setFilter: SetFilterType;
}

export default function FilterTasks({
  filters,
  setFilter,
}: Props): React.ReactElement {
  const { filters: taskFilters, setFilter: setCourseFilters } =
    useFilters<ITaskSearchParams>({
      take: 50,
      name: "",
    });

  const { data: tasks, isLoading } = useGetTasksQuery(taskFilters);

  if (isLoading)
    return (
      <Stack direction="row">
        <Skeleton
          animation="wave"
          sx={{ mb: 5, mr: 5, width: "300px", height: "60px" }}
        />
        <Skeleton
          animation="wave"
          sx={{ mb: 5, width: "300px", height: "60px" }}
        />
      </Stack>
    );

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
