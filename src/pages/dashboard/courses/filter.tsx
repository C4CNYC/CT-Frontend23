import { SetFilterType, useFilters } from "@hooks/useFilters";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Autocomplete, Skeleton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/system/Stack";
import { ICourseSearchParams } from "src/redux/services/interfaces/courseUnits.interface";
import {
  ISchool,
  ISchoolSearchParams,
} from "src/redux/services/interfaces/school.interface";
import { useGetMySchoolsQuery } from "src/redux/services/manager/schools-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

interface Props {
  filters: ICourseSearchParams;
  setFilter: SetFilterType;
}

export default function FilterCourses({
  filters,
  setFilter,
}: Props): React.ReactElement {
  const { filters: schoolFilters, setFilter: setSchoolFilters } =
    useFilters<ISchoolSearchParams>({
      take: 50,
      name: "",
    });

  const { data: schools, isLoading } = useGetMySchoolsQuery(schoolFilters);

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
          onChange={(event) => {
            setFilter("name", event.target.value);
          }}
          placeholder="Name"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Autocomplete<ISchool & BaseResponseInterface>
          options={schools?.data ?? []}
          renderInput={(params) => <TextField {...params} label="School" />}
          onInputChange={(e, value) => {
            setSchoolFilters("name", value);
          }}
          defaultValue={
            schools?.data.filter((m) => m.id === filters.school_id)[0]
          }
          onChange={(event, value, reason, details) => {
            console.log({ value });
            setFilter("school_id", details?.option.id ?? "");
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
