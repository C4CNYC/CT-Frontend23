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

import { CustomAvatar, Iconify, SearchNotFound } from "@components";
import { useFilters } from "@hooks";
import { ICourse } from "@types";
import { BaseResponseInterface } from "@utils";
import {
  useAddCourseToClassMutation,
  useRemoveCourseFromClassMutation,
} from "src/redux/services/manager/classes-manager";
import { useManagerGetCourseQuery } from "../../redux/services/manager/courses-manager";

type CourseType = ICourse & BaseResponseInterface;

interface IClassCoursesAutocompleteProps {
  classId: string;
}

export default function ClassCoursesAutocomplete({
  classId,
}: IClassCoursesAutocompleteProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  const { filters, setFilter } = useFilters({ name: "", take: 50 });

  const [addCourse] = useAddCourseToClassMutation();
  const [removeCourse] = useRemoveCourseFromClassMutation();
  const { data: classCourses } = useManagerGetCourseQuery(
    { class_id: classId, take: 50 },
    { skip: !classId }
  );
  const { data: courses } = useManagerGetCourseQuery(
    { ...filters },
    { skip: !classId }
  );

  if (!courses?.data || !classCourses?.data) {
    return <Skeleton variant="rounded" height="56px" />;
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: CourseType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<CourseType>
  ): Promise<void> => {
    try {
      const payload = {
        id: classId,
        course_id: details?.option.id ?? "",
      };
      switch (reason) {
        case "selectOption": {
          await addCourse(payload).unwrap();
          enqueueSnackbar("course added to class");
          return;
        }
        case "removeOption": {
          await removeCourse(payload).unwrap();
          enqueueSnackbar("course removed from class");
        }
      }
    } catch {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };

  return (
    <Autocomplete<CourseType, true>
      multiple
      id="add-user-input"
      value={classCourses.data}
      onChange={onChange}
      options={courses.data}
      popupIcon={null}
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
            avatar={
              <CustomAvatar
                alt={option.name}
                src={option.cover}
                name={option.name}
              />
            }
            label={option.name}
            {...getTagProps({ index })}
            key={option.name}
          />
        ))
      }
      style={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} placeholder="Courses" />}
      renderOption={(props, recipient, { inputValue }) => {
        const { name, cover } = recipient;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        const selected = classCourses.data.find((c) => c.name === name);

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
              <CustomAvatar alt={name} src={cover} name={name} />
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
