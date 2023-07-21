import {
  Config,
  animals,
  colors,
  starWars,
  uniqueNamesGenerator,
} from "unique-names-generator";

import { Avatar, FormGroup, Stack, Typography } from "@mui/material";

import { RHFSelect, RHFTextField } from "@components";

import ModalEditor from "./ModalEditor";

interface Props {
  editorValue: string;
  setEditorValue: (value: string) => void;
}

export default function DetailsTab({
  editorValue,
  setEditorValue,
}: Props): React.ReactElement {
  const nameConfig: Config = {
    dictionaries: [colors, animals],
    separator: "_",
    length: 2,
  };

  return (
    <Stack gap={4}>
      <FormGroup>
        <Typography variant="h5" gutterBottom pl={2}>
          Select course
        </Typography>
        <RHFSelect
          native
          name="course"
          size="small"
          sx={{
            maxWidth: "500px",
            outline: "none",
            borderRadius: 1,
            "& fieldset": { border: "none" },
            "& .MuiInputBase-root": {
              background: "#F7F7FC",
            },
          }}
        >
          <option key="empty" value="empty"></option>
          <option key="course" value="course">
            Course
          </option>
        </RHFSelect>
      </FormGroup>
      <FormGroup>
        <Typography variant="h5" gutterBottom pl={2}>
          Select module
        </Typography>
        <RHFSelect
          native
          name="module"
          size="small"
          sx={{
            maxWidth: "500px",
            background: "#F7F7FC",
            borderRadius: 1,
            "& fieldset": { border: "none" },
            "& .MuiInputBase-root": {
              background: "#F7F7FC",
            },
          }}
        >
          <option key="empty" value="empty"></option>
          <option key="module" value="module">
            All
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
          defaultValue={uniqueNamesGenerator(nameConfig)}
          placeholder="Course | Web Dev - Wild Foundations"
          sx={{
            background: "#F7F7FC",
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
        <ModalEditor
          editorValue={editorValue}
          setEditorValue={setEditorValue}
        />
      </FormGroup>
    </Stack>
  );
}
