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
  Skeleton,
  TextField,
  Typography,
  alpha,
} from "@mui/material";

import { CustomAvatar, Iconify, SearchNotFound } from "@components";
import { useFilters } from "@hooks";
import { BaseResponseInterface } from "@utils";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import {
  useGetStudentsQuery,
  useStudentJoinClassMutation,
  useStudentLeftClassMutation,
} from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

type StudentType = IStudent & BaseResponseInterface;

interface IClassMembersAutocompleteProps {
  classId: string;
  schoolIdProp?: string;
}

export default function ClassMembersAutocomplete({
  classId,
  schoolIdProp,
}: IClassMembersAutocompleteProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const translate = useTranslate();
  const { filters, setFilter } = useFilters({ email: "", take: 50 });

  const [joinClass] = useStudentJoinClassMutation();
  const [leftClass] = useStudentLeftClassMutation();
  const { data: classMembers } = useGetStudentsQuery(
    { schoolId: schoolIdProp ?? schoolId, class_id: classId, take: 50 },
    { skip: schoolId ? !schoolId || !classId : !schoolIdProp || !classId }
  );
  const { data: students } = useGetStudentsQuery(
    { schoolId: schoolIdProp ?? schoolId, ...filters },
    { skip: schoolId ? !schoolId || !classId : !schoolIdProp || !classId }
  );

  if (!students?.data || !classMembers?.data) {
    return <Skeleton variant="rounded" height="56px" />;
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: StudentType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<StudentType>
  ): Promise<void> => {
    try {
      const payload = {
        classId,
        student_id: details?.option.id ?? "",
      };
      switch (reason) {
        case "selectOption": {
          await joinClass(payload).unwrap();
          enqueueSnackbar(
            translate("classes_joined_to_class_msg", {
              email: details?.option.email ?? "",
            })
          );
          return;
        }
        case "removeOption": {
          await leftClass(payload).unwrap();
          enqueueSnackbar(
            translate("classes_left_class_msg", {
              email: details?.option.email ?? "",
            })
          );
        }
      }
    } catch {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
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
            avatar={<CustomAvatar alt={option.email} src={option.avatar} />}
            label={option?.account?.email}
            {...getTagProps({ index })}
            key={option.email}
          />
        ))
      }
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={translate("classes_add_students")}
        />
      )}
      renderOption={(props, recipient, { inputValue }) => {
        const { email } = recipient.account;
        const matches = match(email, inputValue);
        const parts = parse(email, matches);

        const selected = classMembers.data.find(
          (c) => c.account.email === email
        );

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
                alt={email}
                src={recipient.avatar ?? "/assets/images/avatar_2.jpg"}
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
