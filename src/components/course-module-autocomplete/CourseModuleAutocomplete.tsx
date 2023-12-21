import * as React from "react";

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
  alpha,
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

type ModuleType = IModule & BaseResponseInterface;

interface Props {
  id: string;
}

export default function CourseModuleAutocomplete({
  id,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  const { filters, setFilter } = useFilters({ name: "", take: 50 });

  const [addModule] = useAddModuleToCourseMutation();
  const [removeModule] = useRemoveModuleFromCourseMutation();
  const { data: addedLessons } = useGetModulesQuery(
    { course_id: id, take: 50 },
    { skip: !id }
  );
  const { data: lessons } = useGetModulesQuery({ ...filters }, { skip: !id });

  if (!lessons?.data || !addedLessons?.data) {
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
          enqueueSnackbar(`${details?.option.name ?? ""} added to module`);
          return;
        }
        case "removeOption": {
          await removeModule(payload).unwrap();
          enqueueSnackbar(`${details?.option.name ?? ""} removed from module`);
        }
      }
    } catch {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };

  return (
    <Autocomplete<ModuleType, true>
      multiple
      id="add-user-input"
      value={addedLessons.data}
      onChange={onChange}
      options={lessons.data}
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
      renderInput={(params) => <TextField {...params} placeholder="Lessons" />}
      renderOption={(props, recipient, { inputValue }) => {
        const { id, name } = recipient;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        const selected = addedLessons.data.find((c) => c.id === id);

        return (
          <Box
            component="li"
            sx={{
              p: "12px !important",
              pointerEvents: selected ? "none" : "auto",
            }}
            {...props}
          >
            <Box
              sx={{
                mr: 1.5,
                width: 32,
                height: 32,
                overflow: "hidden",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              <Avatar alt={id} src="/assets/icons/files/ic_file.svg" />

              <Box
                sx={{
                  top: 0,
                  opacity: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                  transition: (theme) =>
                    theme.transitions.create("opacity", {
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
