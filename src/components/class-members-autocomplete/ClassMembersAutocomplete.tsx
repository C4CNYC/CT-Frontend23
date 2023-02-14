import * as React from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import CircularProgress from "@mui/material/CircularProgress";
import {
  alpha,
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Avatar,
  Box,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import {
  useGetStudentsQuery,
  useStudentJoinClassMutation,
  useStudentLeftClassMutation,
} from "src/redux/services/manager";
import { useRouter } from "next/router";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { CustomAvatar } from "src/components/custom-avatar";
import { useFilters } from "src/hooks/useFilters";
import { useSnackbar } from "notistack";
import Iconify from "src/components/iconify";
import SearchNotFound from "src/components/search-not-found";

type StudentType = IStudent & BaseResponseInterface;

export default function ClassMembersAutocomplete() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const class_id = router.query.id as string;
  const school_id = useSelector((state: RootState) => state.manager.school_id);

  const { filters, setFilter } = useFilters({ email: "" });

  const [joinClass] = useStudentJoinClassMutation();
  const [leftClass] = useStudentLeftClassMutation();
  const { data: classMembers } = useGetStudentsQuery(
    { school_id, class_id },
    { skip: !school_id || !class_id }
  );
  const { data: students } = useGetStudentsQuery(
    { school_id, ...filters },
    { skip: !school_id || !class_id }
  );

  if (!students?.data || !classMembers?.data) {
    return <CircularProgress />;
  }

  const onChange = async (
    event: React.SyntheticEvent<any>,
    newValue: StudentType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<StudentType>
  ) => {
    try {
      const payload = {
        school_id,
        class_id,
        student_id: details?.option.id || "",
      }
      switch (reason) {
        case "selectOption": {
          await joinClass(payload).unwrap();
          enqueueSnackbar(`${details?.option.email} joined to class`);
          return;
        }
        case "removeOption": {
          await leftClass(payload).unwrap();
          enqueueSnackbar(`${details?.option.email} left class`);
          return;
        }
      }
    } catch {
      enqueueSnackbar('something went wrong', { variant: "error" });
    }
  };

  return (
    <Autocomplete<IStudent & BaseResponseInterface, true>
      multiple
      id="add-user-input"
      value={classMembers.data}
      onChange={onChange}
      options={students.data}
      popupIcon={null}
      noOptionsText={<SearchNotFound sx={{ p: '20px 0' }} query={filters.email} />}
      onInputChange={(event, value) => setFilter("email", value)}
      getOptionLabel={(option) => option.email}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            avatar={
              <CustomAvatar
                alt={option.email}
                src="/assets/images/avatar_2.jpg"
              />
            }
            label={option.email}
            {...getTagProps({ index })}
          />
        ))
      }
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Students" />
      )}
      renderOption={(props, recipient, { inputValue }) => {
          const { email } = recipient;
          const matches = match(email, inputValue);
          const parts = parse(email, matches);

          const selected = classMembers.data.find(c => c.email === email);

          return (
            <Box
              component="li"
              sx={{
                p: "12px !important",
                pointerEvents: selected ? 'none' : 'auto'
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
                <Avatar alt={email} src="/assets/images/avatar_2.jpg" />
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
