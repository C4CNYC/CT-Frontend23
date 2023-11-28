import { useState, useEffect } from "react";

import {
  Avatar,
  FormGroup,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { RHFSelect, RHFTextField } from "@components";
import { ICourse } from "@types";
import { BaseResponseInterface } from "@utils";
import { useManagerGetSingleCourseQuery } from "src/redux/services/manager/courses-manager";
import { RHFRemirror } from "src/components/hook-form/RHFRemirror";
import { AssignmentTypes } from "src/redux/enums/assignment-types.enum";

import {
  AVATAR_SX,
  INPUT_TEXT_SX,
  inputNameStyles,
  selectStyle,
} from "./constants";

export default function DetailsStep({
    coursesData,
  }: {
    coursesData: {
      data: Array<(ICourse & BaseResponseInterface)> | undefined,
      isLoading: boolean
    }
  }): React.ReactElement {
  const theme = useTheme();
  const { data, isLoading } = coursesData;
  const [type, setType] = useState<AssignmentTypes>(AssignmentTypes.COURSE);
  const [course, setCourse] = useState<string | null>(data?.[0].id ?? null);

  const {
    data: courseData,
    isFetching: isCourseFetching,
    isLoading: isCourseLoading,
  } = useManagerGetSingleCourseQuery({ id: course ?? "" }, { refetchOnMountOrArgChange: true, skip: !course })

  useEffect(() => {
    setCourse(data?.[0].id ?? null)
  }, [data]);

  return (
    <Stack sx={{ gap: 4, minHeight: "630px" }}>
      <Stack direction="row" gap={3} flexWrap="wrap">
        <FormGroup
          sx={{
            maxWidth: { xs: "100%", sm: "100%", md: "300px" },
            width: "100%",
          }}
        >
          <Typography variant="h5" gutterBottom pl={2}>
            Select type
          </Typography>
          <RHFSelect
            native
            name="type"
            size="small"
            onChange={(event: any) => {
              setType(event?.target?.value);
              setCourse(null);
            }}
            value={type}
            sx={{ ...selectStyle(theme), textTransform: "capitalize" }}
          >
            <option key="empty" value="empty"></option>
            {Object.keys(AssignmentTypes).map((t) => (
              <option
                key={AssignmentTypes[t as keyof typeof AssignmentTypes]}
                value={AssignmentTypes[t as keyof typeof AssignmentTypes]}
              >
                {t.split("_").join(" ").charAt(0).toUpperCase() +
                  t.split("_").join(" ").slice(1).toLowerCase()}
              </option>
            ))}
          </RHFSelect>
        </FormGroup>
        {type === AssignmentTypes.COURSE && (
          <FormGroup
            sx={{
              maxWidth: { xs: "100%", sm: "100%", md: "300px" },
              width: "100%",
            }}
          >
            <Typography variant="h5" gutterBottom pl={2}>
              Select a course
            </Typography>
            {!isLoading ? (
              <RHFSelect
                native
                name="course"
                size="small"
                onChange={(event: any) => {
                  setCourse(event?.target?.value);
                }}
                value={course}
                disabled={!data?.length}
                sx={selectStyle(theme)}
              >
                {!data?.length && (
                  <option key="empty" value="empty">
                    You don't have any courses
                  </option>
                )}
                {data
                  ? data.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))
                  : null}
              </RHFSelect>
            ) : (
              <Skeleton
                variant="rounded"
                sx={(theme) => ({
                  height: "40px",
                  background: theme.palette.common.white,
                })}
              />
            )}
          </FormGroup>
        )}
      </Stack>
      <FormGroup
        sx={{
          maxWidth: { xs: "100%", sm: "100%", md: "300px" },
          width: "100%",
        }}
      >
        <Typography variant="h5" gutterBottom pl={2}>
          Select module
        </Typography>
        {(!isCourseLoading && !isCourseFetching) ? (
          <RHFSelect
            native
            name="module"
            size="small"
            sx={{
              borderRadius: 1,
              "& fieldset": { border: "none" },
              background: theme.palette.mode === "light" ? "#fff" : "",
              border: theme.palette.mode === "light" ? "" : "1px solid #fff",
            }}
          >
            {!courseData?.units?.length &&
              <option key="empty" value="empty">
                You don't have any courses
              </option>
            }
            {courseData?.units
              ? [
                <option key="module" value="all">
                  All modules
                </option>,
                ...courseData?.units.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))
              ]
              : null}
          </RHFSelect>
        ) : (
          <Skeleton
            variant="rounded"
            sx={(theme) => ({
              height: "40px",
              background: theme.palette.common.white,
            })}
          />
        )}
      </FormGroup>
      <FormGroup sx={{ position: "relative" }}>
        <Typography variant="h5" gutterBottom pl={2}>
          Quest name
        </Typography>
        <Avatar sx={AVATAR_SX}>🤩</Avatar>
        <RHFTextField sx={inputNameStyles(theme)} name="name" />
        <Typography variant="caption" sx={INPUT_TEXT_SX}>
          You can edit the suggested name that is auto-generated.
        </Typography>
      </FormGroup>
      <FormGroup>
        <Typography variant="h5" gutterBottom pl={2}>
          Description (Optional)
        </Typography>
        <RHFRemirror name="description" />
      </FormGroup>
    </Stack>
  );
}
