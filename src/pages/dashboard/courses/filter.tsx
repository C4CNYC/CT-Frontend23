import RoleAccess from "@components/role-access/RoleAccess";
import { SetFilterType, useFilters } from "@hooks/useFilters";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Autocomplete, Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/system/Stack";
import { Role } from "src/redux/services/enums/role.enum";
import { ICourseSearchParams } from "src/redux/services/interfaces/courseUnits.interface";
import {
  ISchool,
  ISchoolSearchParams,
} from "src/redux/services/interfaces/school.interface";
import { useGetMySchoolsQuery } from "src/redux/services/manager/schools-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import SkeletonFilter from "../../../sections/dashboard/skeleton/skeletonFilter";

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
        <RoleAccess roles={[Role.Admin, Role.Owner, Role.Manager]}>
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
        </RoleAccess>
      </Stack>
    </>
  );
}
