import Iconify from "@components/iconify/Iconify";
import SearchNotFound from "@components/search-not-found";
import {
  alpha,
  Autocomplete,
  Box,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { SyntheticEvent, useState } from "react";
interface Props {
  skills: [] | undefined;
}
export default function CoursesController({
  skills = [],
}: Props): React.ReactElement {
  const [addedSkills, setAddedSkills] = useState([{ name: "CSS", id: 4 }]);

  const handleChange = (
    e: SyntheticEvent<Element, Event>,
    details: Array<{ id: number; name: string }>
  ): void => {
    setAddedSkills(details);
  };
  return (
    <>
      <Autocomplete
        multiple
        options={skills}
        value={addedSkills}
        onChange={handleChange}
        id="tags-outlined"
        renderInput={(params) => <TextField {...params} placeholder="Skills" />}
        getOptionLabel={(option) => option.name}
        noOptionsText={<SearchNotFound sx={{ p: "20px 0" }} query={"skills"} />}
        renderTags={(tagValue, getTagProps): React.ReactElement[] =>
          tagValue.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              key={option.name}
            />
          ))
        }
        renderOption={(props, recipient, { inputValue }) => {
          const { id, name } = recipient;
          const matches = match(name, inputValue);
          const parts = parse(name, matches);
          const selected = addedSkills.find((c) => c.id === id);
          console.log(recipient);
          return (
            <Box
              component="li"
              sx={{
                p: "12px !important",
                pointerEvents: selected ? "none" : "auto",
              }}
              {...props}
            >
              <Box
                sx={{
                  mr: 1.5,
                  width: 22,
                  height: 22,
                  overflow: "hidden",
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    top: 0,
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                    transition: (theme) =>
                      theme.transitions.create("opacity", {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(selected && {
                      opacity: 1,
                      color: "primary.main",
                    }),
                  }}
                >
                  <Iconify icon="eva:checkmark-fill" />
                </Box>
              </Box>

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
      />
    </>
  );
}
