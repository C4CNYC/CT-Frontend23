import { SetFilterType, useFilters } from "@hooks/useFilters";
import { Autocomplete, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import {
  ICourse,
  ICourseSearchParams,
  IModulesSearchParams,
} from "src/redux/services/interfaces/courseUnits.interface";
import { useGetCourseQuery } from "src/redux/services/manager/courses-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

type CourseType = ICourse & BaseResponseInterface;

interface Props {
  filters: IModulesSearchParams;
  setFilter: SetFilterType;
}

export default function FilterCourses(): React.ReactElement {
  const { filters: courseFilters, setFilter: setCourseFilters } =
    useFilters<ICourseSearchParams>({
      take: 50,
      name: "",
    });
  const { data: courses, isLoading } = useGetCourseQuery(courseFilters);

  return (
    <>
      <Stack>
        <Autocomplete<ICourse & BaseResponseInterface>
          options={courses?.data ?? []}
          renderInput={(params) => <TextField {...params} label="Course" />}
          onInputChange={(e, value) => {
            setCourseFilters("name", value);
          }}
          getOptionLabel={(option) => option.name}
          sx={{
            width: { xs: "100%", sm: "100%", md: "260px", lg: "260px" },
            marginRight: 2,
          }}
        />
      </Stack>
    </>
  );
}
