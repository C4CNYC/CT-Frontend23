import { useEffect, useState } from "react";

import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { TbInfoCircleFilled } from "react-icons/tb";

import {
  Box,
  Chip,
  FormGroup,
  Skeleton,
  Stack,
  Typography,
  TypographyVariant,
} from "@mui/material";

import { RHFAutocomplete } from "@components";
import { ISkill } from "src/redux/interfaces/content.interface";
import { useGetSkillQuery } from "src/redux/services/manager/skills-manager";

interface ISkillsAutocompleteProps {
  setAssignmentsSkills: (s: string[]) => void;
  assignmentsSkills?: string[];
  labelProps?: TypographyVariant | undefined;
  skills: ISkill[];
}

export default function SkillsAutocomplete({
  setAssignmentsSkills,
  assignmentsSkills,
  labelProps,
  skills: currentSkills,
}: ISkillsAutocompleteProps): React.ReactElement {
  const { data, isLoading } = useGetSkillQuery({});
  const [choosen] = useState<string[] | []>();

  useEffect(() => {
    if (currentSkills.length) {
      setAssignmentsSkills(currentSkills.map((el: any) => el.id));
    }
  }, [currentSkills]);

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
      <RHFAutocomplete
        name="skills"
        multiple
        freeSolo
        options={data.data}
        limitTags={5}
        onChange={(e, value) => {
          setAssignmentsSkills(value.map((el: any) => el.id));
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
          const { name } = recipient;
          const matches = match(name, inputValue);
          const parts = parse(name, matches);
          const selected = choosen?.find((c: any) => c.name === name);
          return (
            <Box
              component="li"
              sx={{
                pointerEvents: selected ? "none" : "auto",
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
    </FormGroup>
  );
}
