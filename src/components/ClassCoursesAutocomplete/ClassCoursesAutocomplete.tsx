import { CustomAvatar } from "@components/custom-avatar";
import Iconify from "@components/iconify";
import SearchNotFound from "@components/search-not-found";
import {
  alpha,
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
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
import { useSelector } from "react-redux";
import { ICourse } from "src/@types/courses";
import { useFilters } from "src/hooks/useFilters";
import {
  useAddCourseToClassMutation,
  useRemoveCourseFromClassMutation,
} from "src/redux/services/manager/classes-manager";
import { useGetCourseQuery } from "src/redux/services/manager/courses-manager";
import { RootState } from "src/redux/store";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

type CourseType = ICourse & BaseResponseInterface;

export default function ClassCoursesAutocomplete(): React.ReactElement {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const classId = router.query.id as string;
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);

  const { filters, setFilter } = useFilters({ name: "", take: 50 });

  const [addCourse] = useAddCourseToClassMutation();
  const [removeCourse] = useRemoveCourseFromClassMutation();
  const { data: classCourses } = useGetCourseQuery(
    { class_id: classId, take: 50 },
    { skip: !schoolId || !classId }
  );
  const { data: courses } = useGetCourseQuery(
    { ...filters },
    { skip: !schoolId || !classId }
  );

  if (!courses?.data || !classCourses?.data) {
    return <CircularProgress />;
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: CourseType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<CourseType>
  ): Promise<void> => {
    try {
      const payload = {
        schoolId,
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
          return;
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
      onLoadStart={() => {
        console.log("work");
      }}
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
            avatar={<CustomAvatar alt={option.name} src={option.cover} />}
            label={option.name}
            {...getTagProps({ index })}
            key={option.name}
          />
        ))
      }
      style={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} placeholder="Courses" />}
      renderOption={(props, recipient, { inputValue }) => {
        const { name } = recipient;
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
              <CustomAvatar alt={name} src={recipient.cover} />
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
