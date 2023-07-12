import { InputAdornment, TextField } from "@mui/material";

import { Iconify } from "@components";

import { useLocales } from "../../../../locales";

interface Props {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileFilterName({
  filterName,
  onFilterName,
}: Props): React.ReactElement | null {
  const { translate } = useLocales();

  return (
    <TextField
      value={filterName}
      onChange={onFilterName}
      placeholder={`${translate("actions_search")}`}
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
