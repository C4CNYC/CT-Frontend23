import { useEffect, useState } from "react";

import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Skeleton,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";

import { BaseResponseInterface } from "@utils";
import { ICourse } from "src/redux/services/interfaces/courseUnits.interface";
import { useManagerGetCourseQuery } from "src/redux/services/manager/courses-manager";

interface IFilterCoursesAutocomplete {
  courseId: string;
  setCourse: (courseId: string) => void;
}

export default function FilterCoursesAutocomplete({
  courseId,
  setCourse,
}: IFilterCoursesAutocomplete): React.ReactElement {
  const { data: courses, isLoading } = useManagerGetCourseQuery({ take: 50 });
  const [current, setCurrent] = useState<
    (ICourse & BaseResponseInterface) | undefined
  >();
  const onChangeCourse = (
    event: React.SyntheticEvent<any>,
    newValue: (ICourse & BaseResponseInterface) | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ICourse & BaseResponseInterface>
  ): void => {
    if (!details?.option.id) {
      return;
    }
    setCourse(details?.option.id);
  };

  useEffect(() => {
    if (!courses || courseId) {
      return;
    }
    setCourse(courses.data[0] ? courses.data[0].id : "");
  }, [courses]);

  useEffect(() => {
    if (courseId) {
      setCurrent(courses?.data.find((c) => c.id === courseId));
    } else {
      setCurrent(courses?.data[0]);
    }
  }, [courseId]);

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          mr: "16px",
          width: "260px",
          height: "56px",
          borderRadius: "16px",
        }}
      />
    );
  }

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
