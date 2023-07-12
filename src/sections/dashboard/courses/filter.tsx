import SearchOutlined from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/system/Stack";

import { SetFilterType } from "@hooks";
import { ICourseSearchParams } from "src/redux/services/interfaces/courseUnits.interface";

interface Props {
  filters: ICourseSearchParams;
  setFilter: SetFilterType;
}

export default function FilterCourses({
  filters,
  setFilter,
}: Props): React.ReactElement {
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
          defaultValue={filters?.name ?? ""}
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
      </Stack>
    </>
  );
}
