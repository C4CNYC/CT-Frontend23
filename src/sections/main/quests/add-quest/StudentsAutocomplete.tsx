import { useRouter } from "next/router";
import * as React from "react";

import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useAtom } from "jotai";

import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  Skeleton,
  TextField,
  Typography,
  alpha,
} from "@mui/material";

import { CustomAvatar, Iconify } from "@components";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import { useGetStudentsQuery } from "src/redux/services/manager/students-manager";

import { addQuestAtom } from "./add-quest-atom";

export default function StudentsAutocomplete(): React.ReactElement {
  const { query } = useRouter();

  const [choosen] = React.useState<IStudent[] | []>([]);
  const { data, isLoading } = useGetStudentsQuery(
    { schoolId: query.schoolId as string },
    { skip: !query.schoolId }
  );
  const [{ students }, setQuestAtom] = useAtom(addQuestAtom);

  const getStudents = () => {
    if (!students || !data) return;
    return students
      .map((id) => data?.data.filter((student) => student.id === id))
      .reduce((res, cur) => {
        return res.concat(cur);
      }, []);
  };
  getStudents();

  if (!data || isLoading) {
    return (
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ width: "100%", height: "56px" }}
      />
    );
  }
  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      sx={{ pt: 1 }}
      options={data.data}
      defaultValue={getStudents()}
      onChange={(e, value) => {
        setQuestAtom((prev) => ({
          ...prev,
          students: value.map((el) => el.id),
        }));
      }}
      getOptionLabel={(option) => option.last_name}
      renderInput={(params) => (
        <TextField {...params} label="Students" placeholder="add more..." />
      )}
      renderTags={(tagValue, getTagProps): React.ReactElement[] =>
        tagValue.map((option, index) => (
          <Chip
            avatar={<CustomAvatar alt={option.last_name} src={option.avatar} />}
            label={option.last_name}
            {...getTagProps({ index })}
            key={option.last_name}
          />
        ))
      }
      renderOption={(props, recipient, { inputValue }) => {
        const { last_name, avatar } = recipient;
        const matches = match(last_name, inputValue);
        const parts = parse(last_name, matches);
        const selected = choosen.find((c) => c.last_name === last_name);
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
                width: 32,
                height: 32,
                overflow: "hidden",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              <Avatar
                alt={last_name}
                src={avatar ?? "/assets/images/avatar_2.jpg"}
                sx={{ width: "30px", height: "30px" }}
              />

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
  );
}
