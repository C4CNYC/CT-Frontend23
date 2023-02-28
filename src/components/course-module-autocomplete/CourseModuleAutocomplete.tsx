import { CustomAvatar } from "@components/custom-avatar";
import Iconify from "@components/iconify";
import SearchNotFound from "@components/search-not-found";
import {
  alpha,
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Avatar,
  Box,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useFilters } from "src/hooks/useFilters";
import { IModule } from "src/redux/services/interfaces/class.interface";
import { useAddModuleToCourseMutation, useRemoveModuleFromCourseMutation } from "src/redux/services/manager/courses-manager";
import { useGetModulesQuery } from "src/redux/services/manager/modules-manager";

import { BaseResponseInterface } from "src/utils/baseResponce.interface";

type ModuleType = IModule & BaseResponseInterface;

export default function CourseModuleAutocomplete(): React.ReactElement {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const courseId = router.query.id as string;

  const { filters, setFilter } = useFilters({ name: "", take: 50 });

  const [addModule] = useAddModuleToCourseMutation();
  const [removeModule] = useRemoveModuleFromCourseMutation();
  const { data: addedLessons } = useGetModulesQuery(
    { course_id: courseId, take: 50 },
    { skip: !courseId }
  );
  const { data: lessons } = useGetModulesQuery(
    { ...filters },
    { skip: !courseId }
  );

  if (!lessons?.data || !addedLessons?.data) {
    return <CircularProgress />;
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: ModuleType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ModuleType>
  ): Promise<void> => {
    try {
      const payload = {
        id: courseId,
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
          return;
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
      onLoadStart={() => {}}
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
