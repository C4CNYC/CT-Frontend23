import * as React from "react";

import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Avatar,
  Box,
  Chip,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { Iconify, SearchNotFound } from "@components";
import { useFilters } from "@hooks";
import { BaseResponseInterface, voidFunction } from "@utils";
import { IClass } from "src/redux/services/interfaces/class.interface";
import {
  useRemoveClassAssignmentMutation,
  useUpdateClassAssignmentMutation,
} from "src/redux/services/manager/assignments-manager";
import { useGetClassesQuery } from "src/redux/services/manager/classes-manager";
import { RootState } from "src/redux/store";

type ClassType = IClass & BaseResponseInterface;

interface Props {
  addedClasses: ClassType[];
  assignmentId: string;
}

export default function ClassesCountroller({
  addedClasses,
  assignmentId,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);

  const { filters, setFilter } = useFilters({ name: "", schoolId, take: 50 });

  const [addClass] = useUpdateClassAssignmentMutation();
  const [removeClass] = useRemoveClassAssignmentMutation();
  const { data: classes } = useGetClassesQuery(
    { ...filters },
    { skip: !schoolId }
  );

  if (!classes?.data || !addedClasses) {
    return <CircularProgress />;
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: ClassType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ClassType>
  ): Promise<void> => {
    try {
      const payload = {
        schoolId,
        assignmentId,
        class_id: details?.option.id as string,
      };
      switch (reason) {
        case "selectOption": {
          await addClass(payload).unwrap();
          enqueueSnackbar(`${details?.option.name ?? ""} added to module`);
          return;
        }
        case "removeOption": {
          await removeClass(payload).unwrap();
          enqueueSnackbar(`${details?.option.name ?? ""} removed from module`);
          // eslint-disable-next-line no-useless-return
          return;
        }
      }
    } catch {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };

  return (
    <Autocomplete<ClassType, true>
      multiple
      size="small"
      id="add-user-input"
      value={addedClasses}
      onChange={onChange}
      options={classes.data}
      sx={{ width: "100%!important" }}
      popupIcon={null}
      onLoadStart={voidFunction}
      noOptionsText={
        <SearchNotFound sx={{ p: "20px 0" }} query={filters.name} />
      }
      onInputChange={(event, value) => {
        setFilter("email", value);
      }}
      getOptionLabel={(option) => option.name}
      renderTags={(tagValue, getTagProps): React.ReactElement[] =>
        tagValue.map((option, index) => (
          <Chip
            label={option.name}
            {...getTagProps({ index })}
            key={option.name}
          />
        ))
      }
      renderInput={(params) => <TextField {...params} />}
      renderOption={(props, recipient, { inputValue }) => {
        const { id, name } = recipient;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        const selected = addedClasses.find((c) => c.id === id);

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
              <Avatar alt={id} src="/assets/icons/files/ic_file.svg" />

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
