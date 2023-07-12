// @mui
import { InputAdornment, TextField } from "@mui/material";

// components
import { Iconify } from "@components";

// ----------------------------------------------------------------------

interface Props {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactsFilterName({
  filterName,
  onFilterName,
}: Props): React.ReactElement | null {
  return (
    <TextField
      size="small"
      value={filterName}
      onChange={onFilterName}
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
