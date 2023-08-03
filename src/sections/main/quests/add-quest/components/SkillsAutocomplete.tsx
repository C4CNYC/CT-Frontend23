import { useState } from "react";

import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { TbInfoCircleFilled } from "react-icons/tb";

import { Box, Chip, FormGroup, Skeleton, Typography } from "@mui/material";

import { RHFAutocomplete } from "@components";
import { useGetSkillQuery } from "src/redux/services/manager/skills-manager";

interface Props {
  setAssignmentsSkills: (s: string[]) => void;
  assignmentsSkills?: string[];
}
export default function SkillsAutocomplete({
  setAssignmentsSkills,
  assignmentsSkills,
}: Props): React.ReactElement {
  const { data, isLoading } = useGetSkillQuery({});
  const [choosen] = useState<string[] | []>();

  const getSkills = () => {
    if (!data?.data || !assignmentsSkills) return;
    return assignmentsSkills
      .map((id) => data.data.filter((skill) => skill.id === id))
      .reduce((res, cur) => {
        return res.concat(cur);
      }, []);
  };

  if (isLoading || !data) {
    return (
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ width: "100%", height: "56px" }}
      />
    );
  }

  return (
    <FormGroup>
      <Typography variant="h5" gutterBottom>
        Tags:
      </Typography>
      <RHFAutocomplete
        name="skills"
        multiple
        freeSolo
        options={data.data}
        limitTags={5}
        defaultValue={getSkills()}
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
