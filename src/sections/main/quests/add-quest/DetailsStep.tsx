import { useState } from "react";

import { Avatar, FormGroup, Skeleton, Stack, Typography } from "@mui/material";

import { RHFSelect, RHFTextField } from "@components";
import { RHFRemirror } from "src/components/hook-form/RHFRemirror";
import { AssignmentTypes } from "src/redux/enums/assignment-types.enum";
import { useManagerGetCourseQuery } from "src/redux/services/manager/courses-manager";

export default function DetailsStep(): React.ReactElement {
  const { data, isLoading } = useManagerGetCourseQuery({});
  const [type, setType] = useState<AssignmentTypes>(AssignmentTypes.COURSE);
  const onChange = (event: any): void => {
    setType(event.target.value);
  };

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
            onChange={onChange}
            value={type}
            sx={{
              width: "100%",
              outline: "none",
              borderRadius: 1,
              "& fieldset": { border: "none" },
              "& .MuiInputBase-root": {
                background: "#fff",
              },
            }}
          >
            <option key="empty" value="empty"></option>
            {Object.keys(AssignmentTypes).map((t) => (
              <option
                key={AssignmentTypes[t as keyof typeof AssignmentTypes]}
                value={AssignmentTypes[t as keyof typeof AssignmentTypes]}
              >
                {t.split("_").join(" ").toLocaleLowerCase()}
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
              Select course
            </Typography>
            {!isLoading ? (
              <RHFSelect
                native
                name="course"
                size="small"
                disabled={!data?.data.length}
                sx={{
                  width: "100%",
                  outline: "none",
                  borderRadius: 1,
                  "& fieldset": { border: "none" },
                  "& .MuiInputBase-root": {
                    background: "#fff",
                  },
                }}
              >
                <option key="empty" value="empty">
                  {!data?.data.length && "You don't have any courses"}
                </option>
                {data
                  ? data.data.map((course) => (
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
        <RHFSelect
          native
          name="module"
          size="small"
          sx={{
            background: "#fff",
            borderRadius: 1,
            "& fieldset": { border: "none" },
            "& .MuiInputBase-root": {
              background: "#fff",
            },
          }}
        >
          <option key="module" value="all">
            All modules
          </option>
        </RHFSelect>
      </FormGroup>
      <FormGroup sx={{ position: "relative" }}>
        <Typography variant="h5" gutterBottom pl={2}>
          Quest name
        </Typography>
        <Avatar
          sx={{
            position: "absolute",
            left: {
              xs: "calc(50% - 20px)",
              sm: "calc(50% - 25px)",
              md: "calc(50% - 35px)",
            },
            top: { xs: 20, sm: 20, md: 10 },
            width: { xs: "40px", sm: "50px", md: "70px" },
            height: { xs: "40px", sm: "50px", md: "70px" },
            background: "#1ACB7F",
            fontSize: { xs: "30px", sm: "40px", md: "55px" },
            zIndex: 15,
          }}
        >
          🤩
        </Avatar>
        <RHFTextField
          sx={{
            background: "#fff",
            pt: 4,
            pb: 3,
            px: { xs: 0, sm: 3 },
            borderRadius: 2,
            "& fieldset": { border: "none" },
            ".MuiInputBase-input": {
              fontSize: { md: "30px" },
              fontWeight: "700",
            },
          }}
          name="name"
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: "10px",
            left: 0,
            width: "100%",
            textAlign: "center",
            fontSize: { xs: ".6rem", sm: ".8rem" },
          }}
        >
          You can edit the suggested name that is auto-generated.
        </Typography>
      </FormGroup>
      <FormGroup>
        <Typography variant="h5" gutterBottom>
          Description (Optional)
        </Typography>
        <RHFRemirror name="description" />
      </FormGroup>
    </Stack>
  );
}
