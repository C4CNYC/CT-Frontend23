import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Autocomplete, Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/system/Stack";

import { SetFilterType, useFilters } from "@hooks";
import SkeletonFilter from "@sections/dashboard/skeleton/skeletonFilter";
import { BaseResponseInterface } from "@utils";
import {
  ICourse,
  ICourseSearchParams,
  IModulesSearchParams,
} from "src/redux/services/interfaces/courseUnits.interface";
import { useManagerGetCourseQuery } from "src/redux/services/manager/courses-manager";
import { useTranslate } from "src/utils/translateHelper";

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
  const translate = useTranslate();

  const { data: courses, isLoading } = useManagerGetCourseQuery(courseFilters);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <SkeletonFilter />
        <SkeletonFilter />
      </Box>
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
        <TextField
          sx={{
            width: { xs: "100%", sm: "100%", md: "260px", lg: "260px" },
          }}
          placeholder={translate("name")}
          type="text"
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
          renderInput={(params) => (
            <TextField {...params} label={translate("course")} />
          )}
          onInputChange={(e, value) => {
            setCourseFilters("name", value);
          }}
          defaultValue={
            courses?.data.filter((m) => m.id === filters.course_id)[0]
          }
          onChange={(event, value, reason, details) => {
            setFilter("course_id", details?.option.id ?? "");
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
