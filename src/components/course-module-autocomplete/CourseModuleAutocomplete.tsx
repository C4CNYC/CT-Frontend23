import { useMemo } from "react";

import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useSnackbar } from "notistack";

import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Avatar,
  Box,
  Chip,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { CustomAvatar, Iconify, SearchNotFound } from "@components";
import { useFilters } from "@hooks";
import { BaseResponseInterface, voidFunction } from "@utils";
import { IModule } from "src/redux/services/interfaces/courseUnits.interface";
import {
  useAddModuleToCourseMutation,
  useRemoveModuleFromCourseMutation,
} from "src/redux/services/manager/courses-manager";
import { useGetModulesQuery } from "src/redux/services/manager/modules-manager";
import { useTranslate } from "src/utils/translateHelper";

import { BOX_SX, getItemWrapperSx } from "./constants";

type ModuleType = IModule & BaseResponseInterface;

interface Props {
  id: string;
}

export default function CourseModuleAutocomplete({
  id,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const itemWrapperSx = useMemo(() => getItemWrapperSx(theme), [theme]);

  const { filters, setFilter } = useFilters({ name: "", take: 50 });
  const translate = useTranslate();
  const [addModule] = useAddModuleToCourseMutation();
  const [removeModule] = useRemoveModuleFromCourseMutation();
  const { data: addedModules } = useGetModulesQuery(
    { course_id: id, take: 50 },
    { skip: !id }
  );
  const { data: modules } = useGetModulesQuery({ ...filters }, { skip: !id });

  if (!modules?.data || !addedModules?.data) {
    return (
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{ width: "100%", height: "56px" }}
      />
    );
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: ModuleType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ModuleType>
  ): Promise<void> => {
    try {
      const payload = {
        id,
        unit_id: details?.option.id as string,
      };
      switch (reason) {
        case "selectOption": {
          await addModule(payload).unwrap();
          enqueueSnackbar(
            translate("courses_added_to_module", {
              name: details?.option.name ?? "",
            })
          );
          return;
        }
        case "removeOption": {
          await removeModule(payload).unwrap();
          enqueueSnackbar(
            translate("courses_removed_from_module", {
              name: details?.option.name ?? "",
            })
          );
        }
      }
    } catch {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
    }
  };

  return (
    <Autocomplete<ModuleType, true>
      multiple
      id="add-user-input"
      value={addedModules.data}
      onChange={onChange}
      options={modules.data}
      popupIcon={null}
      onLoadStart={voidFunction}
      noOptionsText={
        <SearchNotFound sx={{ p: "20px 0" }} query={filters.name} />
      }
      onInputChange={(event, value) => {
        setFilter("email", value);
      }}
      getOptionLabel={(option) => option.name}
      renderTags={(tagValue, getTagProps): React.ReactElement[] =>
        tagValue.map((option, index) => (
          <Chip
            avatar={
              <CustomAvatar
                alt={option.name}
                src="/assets/icons/files/ic_file.svg"
              />
            }
            label={option.name}
            {...getTagProps({ index })}
            key={option.name}
          />
        ))
      }
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} placeholder={translate("modules")} />
      )}
      renderOption={(props, recipient, { inputValue }) => {
        const { id, name } = recipient;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        const selected = addedModules.data.find((c) => c.id === id);

        return (
          <Box
            component="li"
            sx={{
              p: "12px !important",
              pointerEvents: selected ? "none" : "auto",
            }}
            {...props}
          >
            <Box sx={BOX_SX}>
              <Avatar alt={id} src="/assets/icons/files/ic_file.svg" />

              <Box
                sx={{
                  ...itemWrapperSx,
                  transition: theme.transitions.create("opacity", {
                    easing: theme.transitions.easing.easeInOut,
                    duration: theme.transitions.duration.shorter,
                  }),
                  ...(selected && {
                    opacity: 1,
                    color: "primary.main",
                  }),
                }}
              >
                <Iconify icon="eva:checkmark-fill" />
              </Box>
            </Box>

            {parts.map((part, index) => (
              <Typography
                key={index}
                variant="subtitle2"
                color={part.highlight ? "primary" : "textPrimary"}
              >
                {part.text}
              </Typography>
            ))}
          </Box>
        );
      }}
    />
  );
}
