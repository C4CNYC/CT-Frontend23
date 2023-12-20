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
import { ILesson } from "src/redux/services/interfaces/courseUnits.interface";
import { useGetLessonsQuery } from "src/redux/services/manager/lessons-manager";
import {
  useAddLessonToModuleMutation,
  useRemoveLessonFromModuleMutation,
} from "src/redux/services/manager/modules-manager";
import { useTranslate } from "src/utils/translateHelper";

type LessonType = ILesson & BaseResponseInterface;

interface Props {
  id: string;
}

export default function ModuleLessonsAutocomplete({
  id,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  const { filters, setFilter } = useFilters({ name: "", take: 50 });
  const translate = useTranslate();

  const [addLesson] = useAddLessonToModuleMutation();
  const [removeLesson] = useRemoveLessonFromModuleMutation();
  const { data: addedLessons } = useGetLessonsQuery(
    { module_id: id, take: 50 },
    { skip: !id }
  );
  const { data: lessons } = useGetLessonsQuery({ ...filters }, { skip: !id });

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
    _newValue: LessonType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<LessonType>
  ): Promise<void> => {
    try {
      const payload = {
        id,
        lesson_id: details?.option.id as string,
      };
      switch (reason) {
        case "selectOption": {
          await addLesson(payload).unwrap();
          enqueueSnackbar(
            translate("courses_added_to_module", {
              name: details?.option.name ?? "",
            })
          );
          return;
        }
        case "removeOption": {
          await removeLesson(payload).unwrap();
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
    <Autocomplete<LessonType, true>
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
      renderInput={(params) => (
        <TextField {...params} placeholder={translate("lessons")} />
      )}
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
