// @mui
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

// components
import { Iconify } from "@components";
import { useTranslate } from "src/utils/translateHelper";

// ----------------------------------------------------------------------

interface Props {
  filterName: string;
  filterRole?: string;
  optionsRole?: string[];
  onResetFilter: VoidFunction;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterRole?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserTableToolbar({
  filterName,
  filterRole,
  optionsRole,
  onFilterName,
  onFilterRole,
  onResetFilter,
}: Props): React.ReactElement | null {
  const translate = useTranslate();

  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: "column",
        sm: "row",
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      {optionsRole ? (
        <TextField
          fullWidth
          select
          label={translate("role")}
          value={filterRole}
          onChange={onFilterRole}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  maxHeight: 260,
                },
              },
            },
          }}
          sx={{
            maxWidth: { sm: 240 },
            textTransform: "capitalize",
          }}
        >
          {optionsRole?.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                mx: 1,
                borderRadius: 0.75,
                typography: "body2",
                textTransform: "capitalize",
              }}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>
      ) : null}
      <Box display="flex" flexDirection="row" width="100%" gap="25px">
        <TextField
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder={translate("actions_search")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled" }}
                />
              </InputAdornment>
            ),
          }}
        />
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          {translate("actions_clear")}
        </Button>
      </Box>
    </Stack>
  );
}
