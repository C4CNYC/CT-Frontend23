import { SetFilterType, useFilters } from "@hooks/useFilters";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import {
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/system/Stack";
import { ICourse, ICourseSearchParams, IModulesSearchParams } from "src/redux/services/interfaces/courseUnits.interface";
import { useGetCourseQuery } from "src/redux/services/manager/courses-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

interface Props {
  filters: IModulesSearchParams;
  setFilter: SetFilterType;
}

export default function FilterModules({ filters, setFilter }: Props): React.ReactElement {
  const { filters: courseFilters, setFilter: setCourseFilters } =
    useFilters<ICourseSearchParams>({
      take: 50,
      name: "",
    });

    const { data: courses, isLoading } = useGetCourseQuery(courseFilters);

    if (isLoading) return <CircularProgress />;

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
            width: "260px",
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
        ></TextField>
        <Autocomplete<ICourse & BaseResponseInterface>
          options={courses?.data ?? []}
          renderInput={(params) => <TextField {...params} label="Course" />}
          onInputChange={(e, value) => {
            setCourseFilters("name", value);
          }}
          defaultValue={
            courses?.data.filter((m) => m.id === filters.course_id)[0]
          }
          onChange={(event, value, reason, details) => {
            console.log({ value });
            setFilter("course_id", details?.option.id ?? "");
          }}
          getOptionLabel={(option) => option.name}
          sx={{ width: 200, marginRight: 2 }}
        />
      </Stack>
    </>
  );
}
