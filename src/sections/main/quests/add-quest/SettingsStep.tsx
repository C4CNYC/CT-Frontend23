import { Control } from "react-hook-form";

import { FormGroup, Stack, Typography, useTheme } from "@mui/material";

import { RHFSelect } from "@components";
import { ISkill } from "src/redux/interfaces/content.interface";
import { useTranslate } from "src/utils/translateHelper";

import SkillsAutocomplete from "./components/SkillsAutocomplete";
import TimeController from "./components/TimeController";
import { statusSelect } from "./constants";
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
  const theme = useTheme();
  const translate = useTranslate();

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
          title={translate("quest_schedule_date")}
          name="startDate"
          control={control}
          infoText={translate("quest_schedule_date_info")}
        />
        <TimeController
          title={translate("quest_due_date")}
          name="dueDate"
          control={control}
          infoText={translate("quest_due_date_info")}
        />
      </Stack>
      <TimeController
        title={translate("quest_close_date")}
        name="closeDate"
        control={control}
        infoText={translate("quest_close_date_info")}
      />
      <FormGroup>
        <Typography variant="h5" mt={2} gutterBottom>
          {translate("status")}
        </Typography>
        <RHFSelect
          native
          name="active"
          size="small"
          defaultValue={true as any}
          sx={statusSelect(theme)}
        >
          <option key="published" value={true as any}>
            {translate("published")}
          </option>
          <option key="draft" value={false as any}>
            {translate("draft")}
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
