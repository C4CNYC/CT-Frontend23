import { SetFilterType, useFilters } from "@hooks/useFilters";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Autocomplete, CircularProgress } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/system/Stack";
import { IModule } from "src/redux/services/interfaces/class.interface";
import {
  ILessonSearchParams,
  IModulesSearchParams,
} from "src/redux/services/interfaces/courseUnits.interface";
import { useGetModulesQuery } from "src/redux/services/manager/modules-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

interface Props {
  filters: ILessonSearchParams;
  setFilter: SetFilterType;
}

export default function FilterLessons({
  filters,
  setFilter,
}: Props): React.ReactElement {
  const { filters: moduleFilters, setFilter: setModuleFilters } =
    useFilters<IModulesSearchParams>({
      take: 50,
      name: "",
    });

  const { data: modules, isLoading } = useGetModulesQuery(moduleFilters);

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
            width: { xs: "100%", sm: "100%", md: "260px", lg: "260px" },
          }}
          placeholder="Name"
          value={filters.name}
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
        <Autocomplete<IModule & BaseResponseInterface>
          options={modules?.data ?? []}
          renderInput={(params) => <TextField {...params} label="Module" />}
          onInputChange={(e, value) => {
            setModuleFilters("name", value);
          }}
          defaultValue={
            modules?.data.filter((m) => m.id === filters.module_id)[0]
          }
          onChange={(event, value, reason, details) => {
            console.log({ value });
            setFilter("module_id", details?.option.id ?? "");
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
