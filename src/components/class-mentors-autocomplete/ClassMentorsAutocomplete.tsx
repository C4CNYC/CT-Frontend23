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
import { useGetOrgMembersQuery } from "src/redux/services/admin/members-admin";
import { Role } from "src/redux/services/enums/role.enum";
import { IUser } from "src/redux/services/interfaces/user.interface";
import {
  useDeleteMentorMutation,
  useGetMentorsQuery,
  useUpdateMentorMutation,
} from "src/redux/services/manager/class-mentor-manager";
import { RootState } from "src/redux/store";

type UserType = IUser & BaseResponseInterface;

interface IClassMentorsAutocompleteProps {
  classId: string;
  schoolIdProp?: string;
}

export default function ClassMentorsAutocomplete({
  classId,
  schoolIdProp,
}: IClassMentorsAutocompleteProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);

  const [joinMentor] = useUpdateMentorMutation();
  const [leftMentor] = useDeleteMentorMutation();

  const { filters, setFilter } = useFilters({
    role: Role.Manager,
    email: "",
    take: 50,
  });
  const { data: managers } = useGetOrgMembersQuery({ ...filters });

  const { data: mentors } = useGetMentorsQuery(
    { schoolId: schoolIdProp ?? schoolId, classId },
    { skip: schoolId ? !schoolId || !classId : !schoolIdProp || !classId }
  );
  if (!managers?.data || !mentors) {
    return <Skeleton variant="rounded" height="56px" />;
  }
  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: UserType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<UserType>
  ): Promise<void> => {
    try {
      const payload = {
        schoolId,
        classId,
        userId: details?.option.id ?? "",
      };
      switch (reason) {
        case "selectOption": {
          await joinMentor(payload).unwrap();
          enqueueSnackbar(`${details?.option.email ?? ""} became mentor`);
          return;
        }
        case "removeOption": {
          await leftMentor(payload).unwrap();
          enqueueSnackbar(`${details?.option.email ?? ""} is not a mentor`);
        }
      }
    } catch {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };
  return (
    <Autocomplete<any, true>
      multiple
      id="add-user-input"
      value={mentors.data}
      onChange={onChange}
      options={managers.data}
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
      renderInput={(params) => <TextField {...params} placeholder="Mentors" />}
      renderOption={(props, recipient, { inputValue }) => {
        const { email } = recipient;
        const matches = match(email, inputValue);
        const parts = parse(email, matches);

        const selected = mentors.data?.find((c) => c.email === email);

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
