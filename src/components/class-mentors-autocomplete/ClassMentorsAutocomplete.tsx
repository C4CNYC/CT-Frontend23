import { CustomAvatar } from "@components/custom-avatar";
import Iconify from "@components/iconify/Iconify";
import SearchNotFound from "@components/search-not-found/SearchNotFound";
import { useFilters } from "@hooks/useFilters";
import {
  alpha,
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { IMentor } from "src/redux/services/interfaces/user.interface";
import {
  useDeleteMentorMutation,
  useGetMentorsQuery,
  useUpdateMentorMutation,
} from "src/redux/services/manager/class-mentor-manager";
import { useGetStudentsQuery } from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

type MentorType = IMentor & BaseResponseInterface;

interface Props {
  classId: string;
}

export default function ClassMentorsAutocomplete({
  classId,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { filters, setFilter } = useFilters({ email: "", take: 50 });

  const [joinMentor] = useUpdateMentorMutation();
  const [leftMentor] = useDeleteMentorMutation();
  const { data: classMembers } = useGetStudentsQuery(
    { schoolId, class_id: classId, take: 50 },
    { skip: !schoolId || !classId }
  );
  const { data: students } = useGetStudentsQuery(
    { schoolId, ...filters },
    { skip: !schoolId || !classId }
  );
  const { data: mentors } = useGetMentorsQuery(
    { school_id: schoolId, class_id: classId, ...filters },
    { skip: !schoolId || !classId }
  );
  if (!students?.data || !classMembers?.data) {
    return <CircularProgress />;
  }
  console.log(classMembers, students, mentors);
  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: MentorType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<MentorType>
  ): Promise<void> => {
    try {
      const payload = {
        school_id: schoolId,
        class_id: classId,
        student_id: details?.option.id ?? "",
      };
      switch (reason) {
        case "selectOption": {
          console.log(payload);
          await joinMentor(payload).unwrap();
          enqueueSnackbar(`${details?.option.email ?? ""} joined to class`);
          return;
        }
        case "removeOption": {
          console.log(payload);
          await leftMentor(payload).unwrap();
          enqueueSnackbar(`${details?.option.email ?? ""} left class`);
          return;
        }
      }
    } catch {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };
  return (
    <Autocomplete<IMentor & BaseResponseInterface, true>
      multiple
      id="add-user-input"
      value={classMembers.data}
      onChange={onChange}
      options={mentors ? mentors : []}
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
      renderInput={(params) => <TextField {...params} placeholder="Mentors" />}
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
