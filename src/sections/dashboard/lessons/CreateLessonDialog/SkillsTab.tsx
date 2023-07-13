import * as React from "react";

import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useSnackbar } from "notistack";

import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  Chip,
  Skeleton,
  TextField,
  Typography,
  alpha,
} from "@mui/material";

import { Iconify, SearchNotFound } from "@components";
import { useFilters } from "@hooks";
import { BaseResponseInterface, voidFunction } from "@utils";
import { ISkill } from "src/redux/services/interfaces/skill.interface";
import {
  useGetLessonSkillQuery,
  useRemoveLessonSkillMutation,
  useUpdateLessonSkillMutation,
} from "src/redux/services/manager/lesson-skill-manager";
import { useGetSkillQuery } from "src/redux/services/manager/skills-manager";

export default function SkillsTab({
  lessonId,
}: {
  lessonId: string;
}): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  const { filters, setFilter } = useFilters({ name: "", take: 50 });

  const [updateLessonSkill, { isLoading: addLoading }] =
    useUpdateLessonSkillMutation();
  const [removeIntegration, { isLoading: removeLoading }] =
    useRemoveLessonSkillMutation();
  const { data: skills } = useGetSkillQuery(filters);
  const { data: lessonSkill } = useGetLessonSkillQuery(
    { id: lessonId },
    { skip: !lessonId }
  );

  if (!lessonSkill || !skills) {
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
    _newValue: Array<ISkill & BaseResponseInterface>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ISkill & BaseResponseInterface>
  ): Promise<void> => {
    try {
      const payload = {
        id: lessonId,
        skill_id: details?.option.id ?? "",
      };
      switch (reason) {
        case "selectOption": {
          await updateLessonSkill(payload).unwrap();
          enqueueSnackbar(`${details?.option.name ?? ""} added`);
          return;
        }
        case "removeOption": {
          await removeIntegration(payload).unwrap();
          enqueueSnackbar(`${details?.option.name ?? ""} removed`);
          // eslint-disable-next-line no-useless-return
          return;
        }
      }
    } catch {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };

  return (
    <Autocomplete<ISkill & BaseResponseInterface, true>
      multiple
      loading={addLoading || removeLoading}
      value={lessonSkill}
      onChange={onChange}
      options={skills?.data}
      popupIcon={null}
      onLoadStart={voidFunction}
      noOptionsText={
        <SearchNotFound sx={{ p: "20px 0" }} query={filters.name} />
      }
      onInputChange={(event, value) => {
        setFilter("name", value);
      }}
      getOptionLabel={(option) => option.name}
      renderTags={(tagValue, getTagProps): React.ReactElement[] =>
        tagValue.map((option, index) => (
          <Chip
            label={option.name}
            {...getTagProps({ index })}
            key={option.name}
          />
        ))
      }
      style={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} placeholder="Skills" />}
      renderOption={(props, recipient, { inputValue }) => {
        const { name } = recipient;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        const selected = lessonSkill.find((c) => c.name === name);

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
              <Box
                sx={{
                  top: 0,
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
                  ...{
                    color: "primary.main",
                  },
                }}
              >
                <Iconify
                  icon={
                    selected
                      ? "material-symbols:check-box-outline-rounded"
                      : "material-symbols:check-box-outline-blank"
                  }
                />
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
