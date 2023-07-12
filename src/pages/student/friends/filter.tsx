import SearchOutlined from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/system/Stack";

import { SetFilterType } from "@hooks";
import { IFriendsSearchParams } from "src/redux/interfaces/friends.interface";

interface Props {
  filters: IFriendsSearchParams;
  setFilter: SetFilterType;
}

export default function FilterFriends({
  filters,
  setFilter,
}: Props): React.ReactElement {
  return (
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
    </Stack>
  );
}
