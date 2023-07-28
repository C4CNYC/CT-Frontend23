import { useState } from "react";

import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useAtom } from "jotai";
import { TbInfoCircleFilled } from "react-icons/tb";

import { Box, Chip, FormGroup, Skeleton, Typography } from "@mui/material";

import { RHFAutocomplete } from "@components";
import { ISkill } from "src/redux/interfaces/content.interface";
import { useGetSkillQuery } from "src/redux/services/manager/skills-manager";

import { addQuestAtom } from "./add-quest-atom";

export default function SkillsAutocomplete(): React.ReactElement {
  const [{ assingmentSkills }, setQuestAtom] = useAtom(addQuestAtom);
  const { data, isLoading } = useGetSkillQuery({});
  const [choosen] = useState<ISkill[] | []>();

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
        defaultValue={assingmentSkills}
        onChange={(e, value) => {
          setQuestAtom((prev) => ({
            ...prev,
            assingmentSkills: value as ISkill[],
          }));
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
          const selected = choosen?.find((c) => c.name === name);
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
