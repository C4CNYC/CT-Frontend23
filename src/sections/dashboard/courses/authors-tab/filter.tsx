import { SetFilterType, useFilters } from "@hooks/useFilters";
import { Autocomplete, Skeleton } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  ICourse,
  ICourseSearchParams,
  IModulesSearchParams,
} from "src/redux/services/interfaces/courseUnits.interface";
import { useGetCourseQuery } from "src/redux/services/manager/courses-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

interface Props {
  filters: IModulesSearchParams;
  setFilter: SetFilterType;
}

export default function FilterModules({
  filters,
  setFilter,
}: Props): React.ReactElement {
  const { filters: courseFilters, setFilter: setCourseFilters } =
    useFilters<ICourseSearchParams>({
      take: 50,
      name: "",
    });

  const { data: courses, isLoading } = useGetCourseQuery(courseFilters);

  if (isLoading) {
    return (
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{ mr: 1, width: "80%", height: "56px" }}
      />
    );
  }

  return (
    <Autocomplete<ICourse & BaseResponseInterface>
      options={courses?.data ?? []}
      renderInput={(params) => <TextField {...params} label="Course" />}
      onInputChange={(e, value) => {
        setCourseFilters("name", value);
      }}
      defaultValue={courses?.data.filter((m) => m.id === filters.course_id)[0]}
      onChange={(event, value, reason, details) => {
        setFilter("course_id", details?.option.id ?? "");
      }}
      getOptionLabel={(option) => option.name}
      sx={{
        width: "80%",
        marginRight: 1,
      }}
    />
  );
}
