import { useState } from "react";

import SchoolFiltersSkeleton from "@pages/manager/school/students/school-filter-skeleton";

import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { Iconify } from "@components";
import { useFilters } from "@hooks";
import { BaseResponseInterface } from "@utils";
import {
  ClassSearchParams,
  IClass,
} from "src/redux/interfaces/class.interface";
import { useGetClassesQuery } from "src/redux/services/manager/classes-manager";
import { RootState, useSelector } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

interface Props {
  filterName: string;
  onResetFilter: VoidFunction;
  onFilterName: (name: string) => void;
  onFilterClass: (classId: string) => void;
  disableClassFilter?: boolean;
}

type ClassType = IClass & BaseResponseInterface;

export function CustomAutocomplete({
  filterName,
  onFilterName,
  onFilterClass,
  onResetFilter,
  disableClassFilter,
}: Props): React.ReactElement | null {
  const [value, setValue] = useState<ClassType | null>(null);
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const {
    filters,
    setFilter,
    resetFilters: resetClassFilter,
  } = useFilters<ClassSearchParams>({ name: "" });

  const translate = useTranslate();
  const { data: clases } = useGetClassesQuery(
    { schoolId, ...filters },
    { skip: !schoolId }
  );

  const onChange = (
    event: React.SyntheticEvent<any>,
    newValue: ClassType | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ClassType>
  ): void => {
    onFilterClass(details?.option.id as string);
    setValue(newValue);
    resetClassFilter();
  };

  const onReset = (): void => {
    onResetFilter();
    resetClassFilter();
    setValue(null);
  };

  if (!clases?.data) {
    return <SchoolFiltersSkeleton />;
  }

  return (
    <Stack
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      padding="24px 20px"
    >
      {!disableClassFilter && (
        <Autocomplete<ClassType>
          options={clases.data || []}
          renderInput={(params) => (
            <TextField {...params} label={translate("class")} />
          )}
          onInputChange={(e, value) => {
            setFilter("name", value);
          }}
          onChange={onChange}
          value={value}
          getOptionLabel={(option) => option.name}
          sx={{ width: 350, marginRight: 2 }}
        />
      )}

      <TextField
        fullWidth
        placeholder={translate("actions_search")}
        value={filterName}
        onChange={(e: any) => {
          onFilterName(e.target.value);
        }}
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
        onClick={onReset}
        startIcon={<Iconify icon="eva:trash-2-outline" />}
      >
        {translate("actions_clear")}
      </Button>
    </Stack>
  );
}
