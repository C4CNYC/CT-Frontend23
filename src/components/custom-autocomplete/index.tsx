import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useFilters } from "src/hooks/useFilters";
import {
  ClassSearchParams,
  IClass,
} from "src/redux/services/interfaces/class.interface";
import { useGetClassesQuery } from "src/redux/services/manager";
import { useSelector } from "src/redux/store";
import { RootState } from "src/redux/store";
import CircularProgress from "@mui/material/CircularProgress";

import Iconify from "../iconify/Iconify";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { useState } from "react";

type Props = {
  filterName: string;
  filterRole?: string;
  optionsRole?: string[];
  onResetFilter: VoidFunction;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterRole?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

export default function CustomAutocomplete({
  filterName,
  onFilterName,
  onResetFilter,
}: Props) {
  const [value, setValue] = useState<(IClass & BaseResponseInterface) | null>(
    null
  );
  const school_id = useSelector((state: RootState) => state.manager.school_id);
  const { filters, setFilter, resetFilters } = useFilters<ClassSearchParams>({
    class_id: "",
    name: "",
  });
  const { data: clases } = useGetClassesQuery(
    { school_id, ...filters },
    { skip: !school_id }
  );
  if (!clases?.data) {
    return (
      <Stack padding="24px 20px">
        <CircularProgress />
      </Stack>
    );
  }
  const onChange = (
    event: React.SyntheticEvent<any>,
    newValue: (IClass & BaseResponseInterface) | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IClass & BaseResponseInterface>
  ) => {
    setFilter("class_id", details?.option.id as string);
    setValue(newValue);
  };

  return (
    <Stack
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      padding="24px 20px"
    >
      <Autocomplete<IClass & BaseResponseInterface>
        options={clases.data || []}
        renderInput={(params) => <TextField {...params} label="Class" />}
        onChange={onChange}
        value={value}
        getOptionLabel={(option) => option.name}
        sx={{ width: 350, marginRight: 2 }}
      />

      <TextField
        fullWidth
        placeholder="Search"
        value={filterName}
        onChange={onFilterName}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
            </InputAdornment>
          ),
        }}
        sx={{ marginRight: 2 }}
      />

      <Button
        color="error"
        sx={{ flexShrink: 0, marginLeft: 2, px: 2 }}
        onClick={onResetFilter}
        startIcon={<Iconify icon="eva:trash-2-outline" />}
      >
        Clear
      </Button>
    </Stack>
  );
}
