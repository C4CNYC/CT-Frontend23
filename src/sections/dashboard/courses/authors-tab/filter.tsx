import { SetFilterType } from "@hooks/useFilters";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { IAuthorSearchParams } from "src/redux/services/interfaces/author.interface";

interface Props {
  filters: IAuthorSearchParams;
  setFilter: SetFilterType;
}

export default function FilterAuthors({
  filters,
  setFilter,
}: Props): React.ReactElement {
  return (
    <TextField
      sx={{
        width: "100%",
      }}
      placeholder="Name"
      type="text"
      value={filters?.name}
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
  );
}
