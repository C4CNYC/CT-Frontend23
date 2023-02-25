import { CustomAvatar } from "@components/custom-avatar";
import Iconify from "@components/iconify";
import SearchNotFound from "@components/search-not-found";
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
import CircularProgress from "@mui/material/CircularProgress";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useSelector } from "react-redux";
import { useFilters } from "src/hooks/useFilters";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import {
  useGetStudentsQuery,
  useStudentJoinClassMutation,
  useStudentLeftClassMutation,
} from "src/redux/services/manager";
import { RootState } from "src/redux/store";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

type StudentType = IStudent & BaseResponseInterface;

export default function ClassMembersAutocomplete(): React.ReactElement {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const class_id = router.query.id as string;
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);

  const { filters, setFilter } = useFilters({ email: "", take: 50 });

  const [joinClass] = useStudentJoinClassMutation();
  const [leftClass] = useStudentLeftClassMutation();
  const { data: classMembers } = useGetStudentsQuery(
    { schoolId, class_id, take: 50 },
    { skip: !schoolId || !class_id }
  );
  const { data: students } = useGetStudentsQuery(
    { schoolId, ...filters },
    { skip: !schoolId || !class_id }
  );

  if (!students?.data || !classMembers?.data) {
    return <CircularProgress />;
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: StudentType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<StudentType>
  ): Promise<void> => {
    try {
      const payload = {
        schoolId,
        class_id,
        studentId: details?.option.id ?? "",
      };
      switch (reason) {
        case "selectOption": {
          await joinClass(payload).unwrap();
          enqueueSnackbar(`${details?.option.email ?? ""} joined to class`);
          return;
        }
        case "removeOption": {
          await leftClass(payload).unwrap();
          enqueueSnackbar(`${details?.option.email ?? ""} left class`);
          return;
        }
      }
    } catch {
      enqueueSnackbar("something went wrong", { variant: "error" });
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
      onLoadStart={() => {
        console.log("work");
      }}
      noOptionsText={
        <SearchNotFound sx={{ p: "20px 0" }} query={filters.email} />
      }
      onInputChange={(event, value) => {
        setFilter("email", value);
      }}
      getOptionLabel={(option) => option.email}
      renderTags={(tagValue, getTagProps): React.ReactElement[] =>
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
            key={option.email}
          />
        ))
      }
      style={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} placeholder="Students" />}
      renderOption={(props, recipient, { inputValue }) => {
        const { email } = recipient;
        const matches = match(email, inputValue);
        const parts = parse(email, matches);

        const selected = classMembers.data.find((c) => c.email === email);

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
