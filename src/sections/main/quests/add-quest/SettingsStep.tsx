import { useState } from "react";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import { RHFSelect } from "@components";

import SkillsAutocomplete from "./components/SkillsAutocomplete";
import StudentsAutocomplete from "./components/StudentsAutocomplete";
import TimeController from "./components/TimeController";
import { FormQuestProps } from "./helpers/quest.interface";

interface Props {
  students?: string[];
  setStudents: (s: string[]) => void;
  setAssignmentsSkills: (s: string[]) => void;
  assignmentsSkills?: string[];
  control: Control<FormQuestProps, any>;
}

export default function SettingsStep({
  students,
  control,
  setAssignmentsSkills,
  setStudents,
  assignmentsSkills,
}: Props): React.ReactElement {
  const [value, setValue] = useState("class");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Stack sx={{ gap: 2, minHeight: "630px" }}>
      <Stack direction="row" gap={4} sx={{ flexWrap: { xs: "wrap" } }}>
        <TimeController
          title="Schedule Date:"
          name="startDate"
          control={control}
          infoText="Starting date if not date of creation."
        />
        <TimeController
          title="Due Date"
          name="dueDate"
          control={control}
          infoText="This is the date that this Quest should be completed by."
        />
      </Stack>
      <TimeController
        title="Close Date:"
        name="closeDate"
        control={control}
        infoText="After this submissions are no longer received. The
            default is 3 days after the “Due date.”"
      />
      <FormGroup>
        <Typography variant="h5" gutterBottom>
          Status
        </Typography>
        <RHFSelect
          native
          name="active"
          size="small"
          defaultValue={true as any}
          sx={{
            maxWidth: "300px",
            background: "#F7F7FC",
            outline: "none",
            borderRadius: 1,
            "& fieldset": { border: "none" },
          }}
        >
          <option key="published" value={true as any}>
            Published
          </option>
          <option key="draft" value={false as any}>
            Draft
          </option>
        </RHFSelect>
      </FormGroup>

      <SkillsAutocomplete
        setAssignmentsSkills={(s: string[]) => {
          setAssignmentsSkills(s);
        }}
        assignmentsSkills={assignmentsSkills}
      />

      <FormControl disabled={false}>
        <Typography variant="h5" gutterBottom>
          Assign to:
        </Typography>
        <RadioGroup
          aria-labelledby="assign_to"
          value={value}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="class"
            control={
              <Radio
                sx={{
                  color: "#43D4DD",
                  "&.Mui-checked": {
                    color: "#43D4DD",
                  },
                }}
              />
            }
            label={<Typography variant="subtitle2">Current class</Typography>}
          />
          <FormControlLabel
            value="students"
            control={
              <Radio
                sx={{
                  color: "#43D4DD",
                  "&.Mui-checked": {
                    color: "#43D4DD",
                  },
                }}
              />
            }
            label={<Typography variant="subtitle2">Students</Typography>}
          />
        </RadioGroup>
        {value === "students" && (
          <StudentsAutocomplete students={students} setStudents={setStudents} />
        )}
      </FormControl>
    </Stack>
  );
}
