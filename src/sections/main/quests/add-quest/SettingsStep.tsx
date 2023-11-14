import { Control } from "react-hook-form";

import { Box, FormGroup, Stack, Typography } from "@mui/material";

import { RHFSelect } from "@components";
import { ISkill } from "src/redux/interfaces/content.interface";

import SkillsAutocomplete from "./components/SkillsAutocomplete";
import TimeController from "./components/TimeController";
import { FormQuestProps } from "./helpers/quest.interface";

interface ISettingsStepProps {
  setAssignmentsSkillsId: (s: ISkill[]) => void;
  assignmentsSkillsId?: ISkill[];
  control: Control<FormQuestProps, any>;
  existedSkills: ISkill[];
}

export default function SettingsStep({
  control,
  setAssignmentsSkillsId,
  assignmentsSkillsId,
  existedSkills,
}: ISettingsStepProps): React.ReactElement {
  return (
    <Stack sx={{ gap: 2, minHeight: "630px" }}>
      <Stack
        direction="row"
        gap={4}
        sx={{
          flexWrap: { xs: "wrap" },
          "& .MuiInputBase-root": {
            width: { xs: "100%", sm: "200px", md: "200px" },
          },
        }}
      >
        <TimeController
          title="Schedule Date:"
          name="startDate"
          control={control}
          infoText="Starting date if not date of creation."
        />
        <TimeController
          title="Due Date:"
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
        <Typography variant="h5" mt={2} gutterBottom>
          Status
        </Typography>
        <RHFSelect
          native
          name="active"
          size="small"
          defaultValue={true as any}
          sx={{
            maxWidth: { xs: "100%", sm: "300px", md: "300px" },
            background: "#fff",
            outline: "none",
            borderRadius: 1,
            "& fieldset": { border: "none" },
            width: { xs: "100%", sm: "300px", md: "300px" },
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
        setAssignmentsSkillsId={(s: ISkill[]) => {
          setAssignmentsSkillsId(s);
        }}
        assignmentsSkillsId={assignmentsSkillsId}
        existedSkills={existedSkills}
      />
    </Stack>
  );
}
