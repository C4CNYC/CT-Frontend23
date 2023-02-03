import { TextField, InputAdornment } from "@mui/material";
import Iconify from "../../../../components/iconify";
import {useLocales} from "../../../../locales";

type Props = {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FileFilterName({ filterName, onFilterName }: Props) {
  const { translate } = useLocales();

  return (
    <TextField
      size="small"
      value={filterName}
      onChange={onFilterName}
      placeholder={`${translate('actions_search')}`}
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
