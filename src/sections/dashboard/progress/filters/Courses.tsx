import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Skeleton,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect } from "react";
import { ICourse } from "src/redux/services/interfaces/courseUnits.interface";
import { useGetCourseQuery } from "src/redux/services/manager/courses-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

interface IFilterCoursesAutocomplete {
  courseId: string;
  setCourse: (courseId: string) => void;
}

export default function FilterCoursesAutocomplete({
  courseId,
  setCourse,
}: IFilterCoursesAutocomplete): React.ReactElement {
  const { data: courses, isLoading } = useGetCourseQuery({ take: 50 });

  const onChangeCourse = (
    event: React.SyntheticEvent<any>,
    newValue: (ICourse & BaseResponseInterface) | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ICourse & BaseResponseInterface>
  ): void => {
    if (!details?.option.id) return;
    setCourse(details?.option.id);
  };

  useEffect(() => {
    if (!courses || courseId) return;
    setCourse(courses.data[0] ? courses.data[0].id : "");
  }, [courses]);

  if (isLoading) return <Skeleton width="260px" height="56px" />;

  const current = courseId
    ? courses?.data.find((c) => c.id === courseId)
    : courses?.data[0];

  return (
    <>
      <Stack>
        <Autocomplete<ICourse & BaseResponseInterface>
          value={current}
          options={courses?.data ?? []}
          onChange={onChangeCourse}
          renderInput={(params) => <TextField {...params} label="Course" />}
          getOptionLabel={(option) => option.name}
          sx={{
            width: { xs: "260px", sm: "260px", md: "260px", lg: "260px" },
            marginRight: 2,
          }}
        />
      </Stack>
    </>
  );
}
