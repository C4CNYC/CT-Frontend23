import { useRouter } from "next/router";

import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { TbInfoCircleFilled } from "react-icons/tb";

import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  Chip,
  FormGroup,
  Skeleton,
  Stack,
  TextField,
  Typography,
  TypographyVariant,
} from "@mui/material";

import { useSnackbar } from "@components";
import { ISkill } from "src/redux/interfaces/content.interface";
import {
  useRemoveSkillAssignmentMutation,
  useUpdateSkillAssignmentMutation,
} from "src/redux/services/manager/assignments-manager";
import { useGetSkillQuery } from "src/redux/services/manager/skills-manager";

interface ISkillsAutocompleteProps {
  setAssignmentsSkillsId: (s: ISkill[]) => void;
  assignmentsSkillsId?: ISkill[];
  labelProps?: TypographyVariant | undefined;
  existedSkills: ISkill[];
}

export default function SkillsAutocomplete({
  setAssignmentsSkillsId,
  assignmentsSkillsId,
  labelProps,
  existedSkills,
}: ISkillsAutocompleteProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const {
    query: { schoolId, assignmentId },
  } = useRouter();
  const { data, isLoading } = useGetSkillQuery({});

  const [addSkill] = useUpdateSkillAssignmentMutation();
  const [removeSkill] = useRemoveSkillAssignmentMutation();

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: ISkill[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ISkill>
  ): Promise<void> => {
    if (!assignmentId) {
      setAssignmentsSkillsId(_newValue);
    } else {
      try {
        const payload = {
          schoolId: schoolId as string,
          assignmentId: assignmentId as string,
          skill_id: details?.option.id ?? "",
        };
        switch (reason) {
          case "selectOption": {
            await addSkill(payload).unwrap();
            enqueueSnackbar(`${details?.option.name ?? ""} added`);
            return;
          }
          case "removeOption": {
            await removeSkill(payload).unwrap();
            enqueueSnackbar(`${details?.option.name ?? ""} removed`);
          }
        }
      } catch (error) {
        enqueueSnackbar(error.data.message, { variant: "error" });
      }
    }
  };

  if (isLoading || !data) {
    return (
      <Stack>
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ width: "30px", height: "28px", mb: 1 }}
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ width: "100%", height: "56px" }}
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ width: "100%", height: "27px", mt: 1 }}
        />
      </Stack>
    );
  }

  return (
    <FormGroup>
      <Typography variant={labelProps ? labelProps : "h5"} gutterBottom>
        Tags:
      </Typography>
      <Autocomplete<any, true>
        multiple
        value={assignmentId ? existedSkills : assignmentsSkillsId}
        options={data.data}
        limitTags={5}
        getOptionLabel={(option) => option.name}
        onChange={(e, value, reason, details) => {
          onChange(e, value, reason, details);
        }}
        renderTags={(tagValue, getTagProps): React.ReactElement[] =>
          tagValue.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              key={option.id}
            />
          ))
        }
        ChipProps={{ size: "medium" }}
        sx={{
          "& .MuiOutlinedInput-root": {
            background: "#fff",
          },
          "& .MuiAutocomplete-tag": {
            background: "#FBDD3F",
            textTransform: "uppercase",
            fontSize: "1.0rem",
          },
        }}
        renderOption={(props, recipient, { inputValue }) => {
          const { id, name } = recipient;
          const matches = match(name, inputValue);
          const parts = parse(name, matches);
          const selected = existedSkills.find((c: any) => c.id === id);

          return (
            <Box
              component="li"
              sx={{
                pointerEvents: selected ? "none" : "auto",
                background: selected ? "rgba(251, 221, 63, .5)" : "",
              }}
              {...props}
            >
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
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Tags"
            helperText={
              <Typography
                variant="caption"
                sx={{
                  fontStyle: "italic",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <TbInfoCircleFilled color="#D9D9D9" size={22} />
                This will help others know what the theme is.
              </Typography>
            }
          />
        )}
      />
    </FormGroup>
  );
}
