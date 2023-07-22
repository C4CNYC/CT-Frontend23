import { useState } from "react";

import { useAtom } from "jotai";
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
import { IStudent } from "src/redux/services/interfaces/user.interface";

import { FormProps } from "./AddQuestsModal";
import SkillsAutocomplete from "./SkillsAutocomplete";
import StudentsAutocomplete from "./StudentsAutocomplete";
import TimeController from "./TimeController";
import { addQuestAtom } from "./add-quest-atom";

interface Props {
  control: Control<FormProps, any>;
  schoolId: string;
}

export default function SettingsStep({
  control,
  schoolId,
}: Props): React.ReactElement {
  const [value, setValue] = useState("class");
  const [{ startDate, closeDate, dueDate, assignmentId }, setQuestAtom] =
    useAtom(addQuestAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <Stack sx={{ gap: 2, px: 10, minHeight: "685px" }}>
      <Stack direction="row" gap={4}>
        <TimeController
          title="Schedule Date:"
          name="startDate"
          data={startDate}
          setDate={(date) =>
            setQuestAtom((prev) => ({
              ...prev,
              startDate: date,
            }))
          }
          control={control}
          infoText="Starting date if not date of creation."
        />
        <TimeController
          title="Due Date"
          name="dueDate"
          data={dueDate}
          setDate={(date) =>
            setQuestAtom((prev) => ({
              ...prev,
              dueDate: date,
            }))
          }
          control={control}
          infoText="This is the date that this Quest should be completed by."
        />
      </Stack>
      <TimeController
        title="Close Date:"
        name="closeDate"
        data={closeDate}
        setDate={(date) =>
          setQuestAtom((prev) => ({
            ...prev,
            closeDate: date,
          }))
        }
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

      <SkillsAutocomplete />

      <FormControl disabled={Boolean(assignmentId)}>
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
        {value === "students" && <StudentsAutocomplete schoolId={schoolId} />}
      </FormControl>
    </Stack>
  );
}
