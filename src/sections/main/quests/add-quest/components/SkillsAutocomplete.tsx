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
  useTheme,
} from "@mui/material";

import { useSnackbar } from "@components";
import { ISkill } from "src/redux/interfaces/content.interface";
import {
  useRemoveSkillAssignmentMutation,
  useUpdateSkillAssignmentMutation,
} from "src/redux/services/manager/assignments-manager";
import { useGetSkillQuery } from "src/redux/services/manager/skills-manager";
import { useTranslate } from "src/utils/translateHelper";

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
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const {
    query: { schoolId, assignmentId },
  } = useRouter();
  const { data, isLoading } = useGetSkillQuery({});
  const translate = useTranslate();
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
            enqueueSnackbar(
              translate("messages_sth_added", {
                name: details?.option.name ?? "",
              })
            );
            return;
          }
          case "removeOption": {
            await removeSkill(payload).unwrap();
            enqueueSnackbar(
              translate("messages_sth_removed", {
                name: details?.option.name ?? "",
              })
            );
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
      <Typography variant={labelProps ?? "h5"} gutterBottom>
        {translate("tags")}:
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
              sx={{
                "& .MuiChip-deleteIcon": {
                  color: theme.palette.mode === "light" ? "" : "#333",
                  "&:hover": {
                    color: theme.palette.mode === "light" ? "" : "#999797",
                  },
                },
              }}
            />
          ))
        }
        ChipProps={{ size: "medium" }}
        sx={{
          "& .MuiOutlinedInput-root": {
            background: theme.palette.mode === "light" ? "#fff" : "",
            border: theme.palette.mode === "light" ? "" : "1px solid #fff",
          },
          "& .MuiAutocomplete-tag": {
            background: "#FBDD3F",
            textTransform: "uppercase",
            fontSize: "1.0rem",
            color: theme.palette.mode === "light" ? "" : "#333",
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
            placeholder={translate("tags")}
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
                {translate("assignments_add_tags_info")}
              </Typography>
            }
          />
        )}
      />
    </FormGroup>
  );
}
